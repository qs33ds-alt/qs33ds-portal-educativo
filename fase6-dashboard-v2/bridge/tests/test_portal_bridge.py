import json
import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'bridge'))
from portal_bridge import (REQ_SCHEMA, RESP_SCHEMA, BridgeValidationError,
                           validate_request, build_response, main)

def demo():
    return dict(schema=REQ_SCHEMA,mode='demo',action='summarize_demo',request_id='test_001234',
                source='qs33ds-github-preview',payload=dict(week='2026-W45',
                metrics={'planned_activities':6,'completed_activities':4,'pending_activities':2},
                context={'focus':'organization'}))
class BridgeTests(unittest.TestCase):
    def test_valid(self):
        r=build_response(demo())
        self.assertEqual(r['schema'],RESP_SCHEMA)
        self.assertEqual(r['metrics']['pending_activities'],2)
        self.assertIn('Cap dada personal',r['summary'])
    def test_no_identifying_fields(self):
        d=demo();d['payload']['student']='student test';
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_no_free_text(self):
        d=demo();d['payload']['context']['notes']='Example';
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_no_real_mode(self):
        d=demo();d['mode']='production';
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_no_new_action(self):
        d=demo();d['action']='delete_student';
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_counts(self):
        d=demo();d['payload']['metrics']['planned_activities']=99;
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_boolean_is_not_number(self):
        d=demo();d['payload']['metrics']['planned_activities']=True;
        with self.assertRaises(BridgeValidationError):validate_request(d)
    def test_file_roundtrip(self):
        with tempfile.TemporaryDirectory() as t:
            inp=Path(t)/'in.json';out=Path(t)/'out.json';inp.write_text(json.dumps(demo()),encoding='utf-8')
            self.assertEqual(main([str(inp),'--output',str(out)]),0)
            self.assertEqual(json.loads(out.read_text(encoding='utf-8'))['status'],'ok')
            self.assertEqual(main([str(inp),'--output',str(out)]),2)
    def test_oversize(self):
        with tempfile.TemporaryDirectory() as t:
            inp=Path(t)/'large.json';inp.write_text('x'*9000,encoding='utf-8')
            self.assertEqual(main([str(inp)]),2)
if __name__=='__main__':unittest.main()
