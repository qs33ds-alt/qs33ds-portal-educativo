import assert from 'node:assert/strict';
import {readTheme,saveTheme,searchText} from '../src/utils/preferences';
let stored:string|null=null;
Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>stored,setItem:(_key:string,value:string)=>stored=value}});
assert.equal(readTheme(),'light');saveTheme('dark');assert.equal(readTheme(),'dark');saveTheme('light');assert.equal(readTheme(),'light');stored='invalid';assert.equal(readTheme(),'light');
Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('blocked')}});
assert.equal(readTheme(),'light');assert.doesNotThrow(()=>saveTheme('dark'));
assert.equal(searchText('  Separació SIL·LÀBICA  '),'separacio sil·labica');assert.equal(searchText('GESTIÓ'),'gestio');assert.equal(searchText('autonomía'),'autonomia');assert.equal(searchText('separacio'),searchText('separació'));
console.log('PASS: light default, explicit theme choice, blocked storage and accent-insensitive Catalan search.');
