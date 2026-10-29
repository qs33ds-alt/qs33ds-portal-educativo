import {useEffect,useRef} from 'react';
import {tools} from '../catalog';
import Timer from '../modules/Timer';
import Sequence from '../modules/Sequence';
import Groups from '../modules/Groups';
import Autonomy from '../modules/Autonomy';
import Observation from '../modules/Observation';
import Syllables from '../modules/Syllables';
import Words from '../modules/Words';
import Guidelines from '../modules/Guidelines';
import {useWindows} from './useWindows';
export default function WindowManager({manager:m}:{manager:ReturnType<typeof useWindows>}){
 const drag=useRef<{id:typeof m.items[number]['id'];dx:number;dy:number}|null>(null);
 useEffect(()=>{function resize(){m.items.forEach(w=>m.move(w.id,w.x,w.y))}window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[m.items]);
 return <><div className="window-layer">{m.items.map(w=><section key={w.id} hidden={w.minimized} className="app-window" aria-label={tools.find(t=>t.id===w.id)?.name} style={{left:w.x,top:w.y,zIndex:100+w.z}} onPointerDown={()=>m.focus(w.id)}>
 <header className="window-bar"><button className="window-handle" aria-label="Mou la finestra amb les fletxes o arrossegant" onKeyDown={e=>{const d={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];if(d){e.preventDefault();m.move(w.id,w.x+d[0],w.y+d[1])}}} onPointerDown={e=>{drag.current={id:w.id,dx:e.clientX-w.x,dy:e.clientY-w.y};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{const d=drag.current;if(d?.id===w.id)m.move(w.id,e.clientX-d.dx,e.clientY-d.dy)}} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null}>{tools.find(t=>t.id===w.id)?.name} · ⠿</button><button className="action" aria-label="Minimitza" onClick={()=>m.minimize(w.id)}>−</button></header>
 <div className="window-content">{w.id==='timer'?<Timer/>:w.id==='sequence'?<Sequence/>:w.id==='groups'?<Groups/>:w.id==='autonomy'?<Autonomy/>:w.id==='observation'?<Observation/>:w.id==='syllables'?<Syllables/>:w.id==='words'?<Words/>:w.id==='guidelines'?<Guidelines/>:null}</div></section>)}</div>
 <aside className="window-dock" aria-label="Finestres minimitzades">{m.items.filter(w=>w.minimized).map(w=><button className="action" key={w.id} onClick={()=>m.open(w.id)}>↗ {tools.find(t=>t.id===w.id)?.name}</button>)}</aside></>;
}

