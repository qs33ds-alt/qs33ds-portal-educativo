import {useId,useState,type Dispatch,type SetStateAction} from 'react';
import {useLocalDocument} from '../hooks/useLocalDocument';
import DocumentBackup from '../components/DocumentBackup';
import {initialRoutine,parseRoutine,routineDocument,type Step} from '../data/classroomDocuments';
import {Plus,RotateCcw,Trash2,Undo2} from 'lucide-react';
export default function Autonomy(){
 const prefix=useId();const local=useLocalDocument('qs33ds_eines_autonomy_v1',initialRoutine,parseRoutine,routineDocument);const {title,steps}=local.value;const setTitle=(title:string)=>local.setValue(s=>({...s,title}));const setSteps:Dispatch<SetStateAction<Step[]>>=next=>local.setValue(s=>({...s,steps:typeof next==='function'?next(s.steps):next}));const [draft,setDraft]=useState('');
 const [removed,setRemoved]=useState<{step:Step;index:number}|null>(null);
 const completed=steps.filter(s=>s.done).length;
 function add(){const text=draft.trim();if(!text||steps.length>=30)return;setSteps(s=>[...s,{text,done:false}]);setDraft('')}
 return <div className="tool-surface autonomy-tool"><div className="tool-top"><span>AUTONOMIA PAS A PAS</span><span className="micro-tag">RUTINA VISUAL</span></div>
 <label className="field-label" htmlFor={prefix+'title'}>Nom de la rutina</label><input id={prefix+'title'} maxLength={80} value={title} onChange={e=>setTitle(e.target.value)}/>
 <div className="routine-progress"><strong>{title||'LA MEVA RUTINA'}</strong><p role="status">{steps.length&&completed===steps.length?'RUTINA COMPLETADA!':`${completed} DE ${steps.length} PASSOS FETS`}</p><progress aria-label="Progrés de la rutina" value={completed} max={steps.length||1}/></div>
 <ol className="routine-steps">{steps.map((step,index)=><li key={index} className={step.done?'is-done':''}><span className="step-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><label className="step-check"><input type="checkbox" checked={step.done} aria-label={`Marca el pas ${index+1} com a fet`} onChange={()=>setSteps(s=>s.map((x,i)=>i===index?{...x,done:!x.done}:x))}/><span>{step.done?'FET':'PENDENT'}</span></label><input className="step-text" aria-label={`Text del pas ${index+1}`} maxLength={120} value={step.text} onChange={e=>setSteps(s=>s.map((x,i)=>i===index?{...x,text:e.target.value}:x))}/><button className="icon-btn" aria-label={`Elimina el pas ${index+1}`} onClick={()=>{setRemoved({step,index});setSteps(s=>s.filter((_,i)=>i!==index))}}><Trash2 size={18}/></button></li>)}</ol>
 {!steps.length&&<p className="hint">Afegeix el primer pas per preparar la teva rutina.</p>}
 {removed&&<button disabled={steps.length>=30} className="action" onClick={()=>{setSteps(s=>{const a=[...s];a.splice(Math.min(removed.index,a.length),0,removed.step);return a});setRemoved(null)}}><Undo2 size={17}/> Desfés l’última eliminació</button>}
 <form className="routine-add" onSubmit={e=>{e.preventDefault();add()}}><label className="field-label" htmlFor={prefix+'new'}>Nou pas (màxim 30)</label><div><input id={prefix+'new'} value={draft} maxLength={120} placeholder="Escriu un pas curt..." onChange={e=>setDraft(e.target.value)}/><button className="action primary" disabled={!draft.trim()||steps.length>=30}><Plus size={18}/> Afegeix</button></div></form>
 <button className="action" disabled={!completed} onClick={()=>{setSteps(s=>s.map(x=>({...x,done:false})));setRemoved(r=>r?{...r,step:{...r.step,done:false}}:null)}}><RotateCcw size={17}/> Torna a començar</button>
 <p className="hint">La rutina i els passos marcats es conserven en aquest navegador. Fes servir textos d’activitats, sense dades personals.</p><DocumentBackup value={local.value} onRestore={value=>{local.setValue(value);setRemoved(null);setDraft('')}} parse={parseRoutine} encode={routineDocument} filename="QS33DS_rutina.json" status={local.status}/></div>
}

