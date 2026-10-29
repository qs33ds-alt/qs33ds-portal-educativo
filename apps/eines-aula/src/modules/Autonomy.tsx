import {useId,useState} from 'react';
import {Plus,RotateCcw,Trash2,Undo2} from 'lucide-react';
type Step={id:number;text:string;done:boolean};
const defaults=['Preparo el material','Escolto les instruccions','Faig l’activitat','Reviso la feina','Recullo el material'];
export default function Autonomy(){
 const prefix=useId();const [title,setTitle]=useState('LA MEVA RUTINA');
 const [steps,setSteps]=useState<Step[]>(()=>defaults.map((text,id)=>({id,text,done:false})));
 const [draft,setDraft]=useState('');const [serial,setSerial]=useState(defaults.length);
 const [removed,setRemoved]=useState<{step:Step;index:number}|null>(null);
 const completed=steps.filter(s=>s.done).length;
 function add(){const text=draft.trim();if(!text||steps.length>=30)return;setSteps(s=>[...s,{id:serial,text,done:false}]);setSerial(s=>s+1);setDraft('')}
 return <div className="tool-surface autonomy-tool"><div className="tool-top"><span>AUTONOMIA PAS A PAS</span><span className="micro-tag">RUTINA VISUAL</span></div>
 <label className="field-label" htmlFor={prefix+'title'}>Nom de la rutina</label><input id={prefix+'title'} maxLength={80} value={title} onChange={e=>setTitle(e.target.value)}/>
 <div className="routine-progress"><strong>{title||'LA MEVA RUTINA'}</strong><p role="status">{steps.length&&completed===steps.length?'RUTINA COMPLETADA!':`${completed} DE ${steps.length} PASSOS FETS`}</p><progress aria-label="Progrés de la rutina" value={completed} max={steps.length||1}/></div>
 <ol className="routine-steps">{steps.map((step,index)=><li key={step.id} className={step.done?'is-done':''}><span className="step-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><label className="step-check"><input type="checkbox" checked={step.done} aria-label={`Marca el pas ${index+1} com a fet`} onChange={()=>setSteps(s=>s.map(x=>x.id===step.id?{...x,done:!x.done}:x))}/><span>{step.done?'FET':'PENDENT'}</span></label><input className="step-text" aria-label={`Text del pas ${index+1}`} maxLength={120} value={step.text} onChange={e=>setSteps(s=>s.map(x=>x.id===step.id?{...x,text:e.target.value}:x))}/><button className="icon-btn" aria-label={`Elimina el pas ${index+1}`} onClick={()=>{setRemoved({step,index});setSteps(s=>s.filter(x=>x.id!==step.id))}}><Trash2 size={18}/></button></li>)}</ol>
 {!steps.length&&<p className="hint">Afegeix el primer pas per preparar la teva rutina.</p>}
 {removed&&<button disabled={steps.length>=30} className="action" onClick={()=>{setSteps(s=>{const a=[...s];a.splice(Math.min(removed.index,a.length),0,removed.step);return a});setRemoved(null)}}><Undo2 size={17}/> Desfés l’última eliminació</button>}
 <form className="routine-add" onSubmit={e=>{e.preventDefault();add()}}><label className="field-label" htmlFor={prefix+'new'}>Nou pas (màxim 30)</label><div><input id={prefix+'new'} value={draft} maxLength={120} placeholder="Escriu un pas curt..." onChange={e=>setDraft(e.target.value)}/><button className="action primary" disabled={!draft.trim()||steps.length>=30}><Plus size={18}/> Afegeix</button></div></form>
 <button className="action" disabled={!completed} onClick={()=>{setSteps(s=>s.map(x=>({...x,done:false})));setRemoved(r=>r?{...r,step:{...r.step,done:false}}:null)}}><RotateCcw size={17}/> Torna a començar</button>
 <p className="hint">La rutina es manté en minimitzar. Es reinicia en recarregar la pàgina; no es desa cap dada personal.</p></div>
}
