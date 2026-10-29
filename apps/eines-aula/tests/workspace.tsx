import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {toolLaunch,panelTools,standaloneTool,DEFAULT_PANEL_TOOL} from '../src/data/toolLaunch';
import {preferences} from '../src/data/dashboardPreferences';
import {tools} from '../src/catalog';
import ToolContent from '../src/components/ToolContent';
for(const t of tools){assert.equal(toolLaunch('?tool='+t.id).tool,t.id);assert.equal(toolLaunch('?tool='+t.id+'&embed=1').embedded,true);assert(renderToStaticMarkup(<ToolContent id={t.id}/>).length>100);}
for(const invalid of ['?tool=javascript:alert(1)&embed=1','?tool=../../files','?embed=1','?tool=','?tool=unknown'])assert.deepEqual(toolLaunch(invalid),{tool:null,embedded:false});
assert.equal(panelTools.length,tools.filter(t=>t.ready).length);
assert.equal(standaloneTool(DEFAULT_PANEL_TOOL),'eines-aula/?tool=timer');
assert.deepEqual(preferences({quad:true,day:4,tool:DEFAULT_PANEL_TOOL}),{quad:true,day:4,tool:DEFAULT_PANEL_TOOL});
for(const day of [-1,5,NaN,1.5,'2'])assert.equal(preferences({day},3).day,3);
for(const tool of ['https://evil.invalid/','javascript:alert(1)','../files/'])assert.equal(preferences({tool},0).tool,DEFAULT_PANEL_TOOL);
assert.equal(preferences(null,2).day,2);
console.log('PASS: eight shared module renders, direct and embedded launches, invalid tool rejection, safe preference fallback and standalone links.');
