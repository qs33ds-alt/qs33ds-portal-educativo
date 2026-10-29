import type {Word} from './vocabulary';
export function boundaries(item:Word){let total=0;return item.syllables.slice(0,-1).map(s=>{total+=Array.from(s).length;return total})}
export function correctBoundaries(item:Word,selected:number[]){const expected=boundaries(item);const actual=[...new Set(selected)].sort((a,b)=>a-b);return expected.length===actual.length&&expected.every((n,i)=>n===actual[i])}
export function correctOrder(item:Word,order:number[]){return order.length===item.syllables.length&&new Set(order).size===order.length&&order.every(i=>Number.isInteger(i)&&i>=0&&i<item.syllables.length)&&order.map(i=>item.syllables[i]).join('|')===item.syllables.join('|')}
export function shuffledIndices(length:number){const a=Array.from({length},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}if(a.length>1&&a.every((v,i)=>v===i))a.push(a.shift()!);return a}
