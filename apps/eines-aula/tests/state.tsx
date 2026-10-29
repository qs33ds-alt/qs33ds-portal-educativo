import assert from 'node:assert/strict';
import React from 'react';
import {create,act} from 'react-test-renderer';
import {useWindows} from '../src/components/useWindows';
import Timer from '../src/modules/Timer';
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
globalThis.window={innerWidth:1280,innerHeight:900,setInterval,clearInterval};
let manager:ReturnType<typeof useWindows>;
function Harness(){manager=useWindows();return null}
let root;await act(()=>{root=create(<Harness/>)});
await act(()=>manager.open('timer'));await act(()=>manager.open('sequence'));assert.equal(manager.items.length,2);
await act(()=>manager.minimize('timer'));assert(manager.items[0].minimized);
await act(()=>manager.open('timer'));assert.equal(manager.items.length,2);assert(!manager.items[0].minimized);assert(manager.items[0].z>manager.items[1].z);
await act(()=>manager.move('timer',-30,3000));assert.equal(manager.items[0].x,12);assert.equal(manager.items[0].y,820);
await act(()=>root.unmount());
let t;await act(()=>{t=create(<Timer/>)});const button=(name)=>t.root.findAllByType('button').find(b=>b.children.filter(c=>typeof c==='string'||typeof c==='number').join('').trim()===name);
await act(()=>button('1 min').props.onClick());await act(()=>button('Inicia').props.onClick());await act(async()=>{await new Promise(r=>setTimeout(r,1250))});assert.equal(t.root.findByType('output').children.join(''),'00:59');await act(()=>button('Pausa').props.onClick());const paused=t.root.findByType('output').children.join('');await act(async()=>{await new Promise(r=>setTimeout(r,1100))});assert.equal(t.root.findByType('output').children.join(''),paused);await act(()=>button('Reinicia').props.onClick());assert.equal(t.root.findByType('output').children.join(''),'01:00');await act(()=>t.unmount());console.log('PASS: window open/minimize/restore/dedup/focus/clamp; timer start/tick/pause/reset.');
