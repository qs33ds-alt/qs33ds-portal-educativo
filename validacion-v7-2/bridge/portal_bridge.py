"""Manual, demo-only JSON bridge. No profile access, no network by default."""
import argparse
from datetime import date
import json
from pathlib import Path
import re
import urllib.request

REQUEST_SCHEMA = 'qs33ds.portal.ai-bridge.request.v1'
RESPONSE_SCHEMA = 'qs33ds.portal.ai-bridge.response.v1'
MAX_BYTES = 8192


def validate_request(data):
    def fields(obj, expected):
        if not isinstance(obj, dict) or set(obj) != set(expected):
            raise ValueError('Estructura de petición no permitida.')
    fields(data, ['schema', 'mode', 'action', 'request_id', 'source', 'payload'])
    if data['schema'] != REQUEST_SCHEMA or data['mode'] != 'demo' or data['action'] != 'summarize_demo' or data['source'] != 'qs33ds-github-preview':
        raise ValueError('Solo se admiten peticiones demo del portal.')
    if not isinstance(data['request_id'], str) or not re.fullmatch(r'demo_[A-Za-z0-9_-]{1,64}', data['request_id']):
        raise ValueError('Identificador de petición inválido.')
    payload = data['payload']
    fields(payload, ['week', 'metrics', 'context'])
    week = payload['week']
    if not isinstance(week, str) or not re.fullmatch(r'20\d{2}-W\d{2}', week):
        raise ValueError('Semana ISO inválida.')
    date.fromisocalendar(int(week[:4]), int(week[-2:]), 1)
    fields(payload['context'], ['focus'])
    if payload['context']['focus'] not in ('organization', 'autonomy', 'reading', 'general'):
        raise ValueError('Ámbito no permitido.')
    metrics = payload['metrics']
    fields(metrics, ['planned_activities', 'completed_activities', 'pending_activities'])
    if any(type(value) is not int or not 0 <= value <= 100 for value in metrics.values()):
        raise ValueError('Las métricas deben ser enteros entre 0 y 100.')
    if metrics['completed_activities'] > metrics['planned_activities'] or metrics['pending_activities'] != metrics['planned_activities'] - metrics['completed_activities']:
        raise ValueError('Las métricas no son coherentes.')
    return data


def read_request(path):
    with Path(path).open('rb') as stream:
        raw = stream.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise ValueError('El archivo supera 8192 bytes.')
    def unique(pairs):
        obj = {}
        for key, value in pairs:
            if key in obj: raise ValueError('Claves JSON duplicadas.')
            obj[key] = value
        return obj
    return validate_request(json.loads(raw.decode('utf-8-sig'), object_pairs_hook=unique))


def process_request(data, use_ollama=False):
    validate_request(data)
    payload = data['payload']
    metrics = dict(payload['metrics'])
    planned = metrics['planned_activities']
    completed = metrics['completed_activities']
    pending = metrics['pending_activities']
    focus = {'organization': 'organització', 'autonomy': 'autonomia', 'reading': 'lectura', 'general': 'general'}[payload['context']['focus']]
    summary = (f"Setmana {payload['week']} · Àmbit: {focus}.\n"
               f"Activitats planificades: {planned}. Completades: {completed}. Pendents: {pending}.\n")
    summary += ('Encara no hi ha activitats planificades.' if planned == 0 else
                'Totes les activitats estan completades.' if pending == 0 else
                'Proposta: revisa les activitats pendents i tria el següent pas.\nAquest resum descriu dades fictícies; no és una avaluació de cap alumne.')
    engine = 'local-rules-v1'
    if use_ollama:
        body = json.dumps({'model': 'qwen3:1.7b', 'stream': False, 'think': False,
            'messages': [{'role': 'user', 'content': 'Resumeix breument en català aquestes mètriques fictícies. No inventis dades ni avaluïs alumnes: ' + json.dumps(payload)}],
            'options': {'num_predict': 180, 'temperature': 0.2}}).encode('utf-8')
        request = urllib.request.Request('http://127.0.0.1:11434/api/chat', data=body, headers={'Content-Type': 'application/json'})
        # No proxy or redirect may forward the synthetic payload to another host.
        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, req, fp, code, msg, headers, newurl): return None
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
        with opener.open(request, timeout=45) as response:
            raw = response.read(32769)
        if len(raw) > 32768: raise ValueError('Respuesta de Ollama demasiado grande.')
        content = json.loads(raw)['message']['content']
        if not isinstance(content, str) or not content.strip() or len(content) > 2000:
            raise ValueError('Respuesta de Ollama inválida.')
        summary = content.strip()
        engine = 'ollama:qwen3:1.7b'
    return {'schema': RESPONSE_SCHEMA, 'mode': 'demo', 'action': 'summarize_demo',
            'status': 'ok', 'request_id': data['request_id'], 'metrics': metrics,
            'summary': summary, 'engine': engine}


def write_response(path, response):
    raw = json.dumps(response, ensure_ascii=False, indent=2).encode('utf-8')
    if len(raw) > MAX_BYTES: raise ValueError('Respuesta demasiado grande.')
    with Path(path).open('xb') as stream: stream.write(raw)


def main():
    parser = argparse.ArgumentParser(description='Puente manual QS33DS Portal · solo datos demo')
    parser.add_argument('request')
    parser.add_argument('--output', required=True)
    parser.add_argument('--ollama', action='store_true', help='Enviar únicamente las métricas ficticias al Ollama local (opcional)')
    args = parser.parse_args()
    try:
        result = process_request(read_request(args.request), args.ollama)
        write_response(args.output, result)
    except Exception as exc:
        parser.exit(1, f'No se ha generado la respuesta: {type(exc).__name__}: {exc}\n')
    print(f"Respuesta guardada: {args.output} ({result['engine']})")


if __name__ == '__main__': main()