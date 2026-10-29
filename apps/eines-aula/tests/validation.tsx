import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import TimerVisual,{styles} from '../src/components/TimerVisual';
import Timer from '../src/modules/Timer';
import Sequence from '../src/modules/Sequence';
import Groups from '../src/modules/Groups';
import {constrain} from '../src/components/useWindows';
import {tools} from '../src/catalog';
assert.equal(styles.length,8);assert.equal(new Set(styles.map(s=>s[0])).size,8);
for(const [style] of styles)for(const progress of [0,.5,1,-1,2]){const html=renderToStaticMarkup(<TimerVisual style={style} progress={progress} time="05:00"/>);assert(html.includes(`visual-${style}`));assert(html.includes('05:00'));assert(!html.includes('NaN'));}
assert.deepEqual(constrain(-1,-20,390,844),{x:0,y:0});assert.deepEqual(constrain(900,900,390,844),{x:110,y:764});assert.deepEqual(constrain(900,900,100,50),{x:0,y:0});
assert.equal(tools.filter(t=>t.ready).length,3);assert.equal(tools.length,8);
assert(renderToStaticMarkup(<Timer/>).includes('05:00'));assert(renderToStaticMarkup(<Sequence/>).includes('Fem una activitat'));assert(renderToStaticMarkup(<Groups/>).includes('Alumne A'));
console.log('PASS: 40 timer renders, 8 distinct styles, numeric boundaries, 3 window boundary cases, catalog, 3 original modules SSR.');
