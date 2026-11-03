"""QS33DS Portal <-> QS33DS Local, opt-in demo-only file bridge.

No network except optional Ollama loopback, no imports from existing QS33DS Local,
no access to existing SQLite databases, no student data, no automatic actions.
"""
from __future__ import annotations
import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path

REQ_SCHEMA = 'qs33ds.portal.ai-bridge.request.v1'
RESP_SCHEMA = 'qs33ds.portal.ai-bridge.response.v1'
SUPPORTED_ACTION = 'summarize_demo'
MAX_SIZE = 8192
MAX_RESPONSE = 4096
ALLOWED_METRICS = {'planned_activities', 'completed_activities', 'pending_activities'}
ALLOWED_TOP = {'schema','mode','action','request_id','source','payload'}
ALLOWED_PAYLOAD = {'week','metrics','context'}
ALLOWED_CONTEXT = {'focus'}
FOCI = {'organization','autonomy','reading','general'}

class BridgeValidationError(ValueError):
    pass

def _expect(condition: bool, message: str) -> None:
    if not condition:
        raise BridgeValidationError(message)

def validate_request(value: object) -> dict:
    _expect(type(value) is dict, 'Request must be an object')
    _expect(set(value) == ALLOWED_TOP, 'Unexpected or missing request fields')
    _expect(value['schema'] == REQ_SCHEMA, 'Unsupported schema')
    _expect(value['mode'] == 'demo', 'Only demo mode is supported')
    _expect(value['source'] == 'qs33ds-github-preview', 'Source not allowed')
    _expect(value['action'] == SUPPORTED_ACTION, 'Action not allowed')
    _expect(isinstance(value['request_id'], str) and bool(re.fullmatch(r'[A-Za-z0-9_-]{8,64}', value['request_id'])), 'Invalid request id')
    payload = value['payload']
    _expect(type(payload) is dict and set(payload) == ALLOWED_PAYLOAD, 'Invalid payload fields')
    _expect(type(payload['week']) is str and bool(re.fullmatch(r'20\d{2}-W(?:0[1-9]|[1-4][0-9]|5[0-3])', payload['week'])), 'Invalid week')
    metrics = payload['metrics']
    _expect(type(metrics) is dict and set(metrics) == ALLOWED_METRICS, 'Unexpected metrics')
    for name, qty in metrics.items():
        _expect(type(qty) is int and 0 <= qty <= 100, f'Invalid metric {name}')
    planned, done, pending = (metrics[x] for x in ('planned_activities','completed_activities','pending_activities'))
    _expect(done + pending == planned, 'Activity counts do not add up')
    ctx = payload['context']
    _expect(type(ctx) is dict and set(ctx) == ALLOWED_CONTEXT and type(ctx['focus']) is str and ctx['focus'] in FOCI, 'Invalid context')
    return value

def load_request(path: Path) -> dict:
    if not path.is_file():
        raise BridgeValidationError('Input file not found')
    if path.stat().st_size > MAX_SIZE:
        raise BridgeValidationError('File too large')
    try:
        doc = json.loads(path.read_text(encoding='utf-8'))
    except (UnicodeError, json.JSONDecodeError) as ex:
        raise BridgeValidationError('Not a valid UTF-8 JSON request') from ex
    return validate_request(doc)

def deterministic_summary(doc: dict) -> str:
    metrics = doc['payload']['metrics']
    done = metrics['completed_activities']
    planned = metrics['planned_activities']
    pending = metrics['pending_activities']
    focus = doc['payload']['context']['focus']
    return (f"Resum de prova ({doc['payload']['week']}): {done} de {planned} activitats completades; "
            f"{pending} pendents. Àmbit fictici: {focus}. Cap dada personal processada.")

def ask_ollama(doc: dict, *, model: str, timeout: int = 25) -> str:
    if not re.fullmatch(r'[A-Za-z0-9_.:-]{1,60}', model):
        raise BridgeValidationError('Invalid Ollama model identifier')
    prompt = ('Resume en catalán en dos frases únicamente estos datos ficticios; no inventes detalles, '
              'no nombres alumnado, no propongas acciones automáticas: ' + deterministic_summary(doc))
    body = json.dumps({'model':model,'prompt':prompt,'stream':False,'options':{'temperature':0}}).encode('utf-8')
    req = urllib.request.Request('http://127.0.0.1:11434/api/generate', data=body,
                                 headers={'Content-Type':'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            raw = response.read(MAX_RESPONSE + 1)
    except Exception as ex:
        raise BridgeValidationError('Cannot contact local Ollama; run without --ollama to use deterministic mode') from ex
    if len(raw) > MAX_RESPONSE:
        raise BridgeValidationError('Ollama response too large')
    try:
        result = json.loads(raw.decode('utf-8'))
    except (UnicodeError, json.JSONDecodeError) as ex:
        raise BridgeValidationError('Invalid Ollama response') from ex
    if type(result) is not dict:
        raise BridgeValidationError('Unexpected Ollama response structure')
    text = result.get('response')
    if not isinstance(text, str) or not 1 <= len(text.strip()) <= 2000:
        raise BridgeValidationError('Empty or excessive Ollama response')
    return text.strip()

def build_response(doc: dict, *, ollama: bool = False, model: str = 'qwen3:1.7b') -> dict:
    doc = validate_request(doc)
    summary = ask_ollama(doc, model=model) if ollama else deterministic_summary(doc)
    return {'schema':RESP_SCHEMA,'mode':'demo','request_id':doc['request_id'],
            'action':SUPPORTED_ACTION,'status':'ok','engine':f'ollama:{model}' if ollama else 'deterministic',
            'summary':summary,'metrics':dict(doc['payload']['metrics'])}

def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description='QS33DS safe demo bridge (no automatic portal writes)')
    p.add_argument('input',type=Path,help='JSON file explicitly exported from portal demo')
    p.add_argument('--output',type=Path,help='Output JSON path (must not exist); omit for stdout')
    p.add_argument('--ollama',action='store_true',help='Optional local Ollama inference on synthetic counts only')
    p.add_argument('--model',default='qwen3:1.7b')
    a=p.parse_args(argv)
    try:
        response=build_response(load_request(a.input),ollama=a.ollama,model=a.model)
        value=json.dumps(response,ensure_ascii=False,indent=2)+'\n'
        if a.output:
            # Exclusive create: existing files and databases never overwritten.
            with a.output.open('x',encoding='utf-8') as out:
                out.write(value)
            print(f'Result written: {a.output}')
        else:
            sys.stdout.write(value)
        return 0
    except (BridgeValidationError,OSError) as ex:
        print(f'QS33DS Bridge: {ex}',file=sys.stderr)
        return 2

if __name__=='__main__':
    raise SystemExit(main())
