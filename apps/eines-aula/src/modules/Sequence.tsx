import {useState} from 'react';
import {useLocalDocument} from '../hooks/useLocalDocument';
import DocumentBackup from '../components/DocumentBackup';
import {initialSequence,parseSequence,sequenceDocument} from '../data/classroomDocuments';
import {parsePictograms,matchPictogram,pictogramKey,type Pictogram} from '../data/pictograms';
import {ArrowRight,Check,RotateCcw,Upload} from 'lucide-react';

const STORE='qs33ds_eines_pictograms_v1';
function loadPictograms():Pictogram[]{try{return parsePictograms(JSON.parse(localStorage.getItem(STORE)||'[]'))}catch{return []}}
export default function Sequence(){
 const local=useLocalDocument('qs33ds_eines_sequence_v1',initialSequence,parseSequence,sequenceDocument);
 const {now,next,done}=local.value;
 const [pictures,setPictures]=useState<Pictogram[]>(loadPictograms);
 const [error,setError]=useState('');
 const [search,setSearch]=useState('');
 const [target,setTarget]=useState<'now'|'next'>('now');
 const setNow=(now:string)=>local.setValue(s=>({...s,now,done:false}));
 const setNext=(next:string)=>local.setValue(s=>({...s,next}));
 const setDone=(done:boolean)=>local.setValue(s=>({...s,done}));
 const filtered=pictures.filter(p=>pictogramKey(p.label).includes(pictogramKey(search))).slice(0,48);
 async function importFile(file?:File){if(!file)return;try{if(file.size>3_000_000)throw Error('El fitxer supera els 3 MB.');const parsed=parsePictograms(JSON.parse(await file.text()));localStorage.setItem(STORE,JSON.stringify(parsed));setPictures(parsed);setError('');}catch(e){setError(e instanceof Error?e.message:'No s’ha pogut importar.');}}
 const card=(label:string,value:string,secondary=false)=><article className={'sequence-card'+(secondary?' secondary':done?' done':'')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,minHeight:220}}>
  <span>{label}</span>
  {matchPictogram(value,pictures)?<img src={matchPictogram(value,pictures)!.image} alt={value} style={{height:124,maxWidth:'100%',objectFit:'contain'}}/>:<span role="img" aria-label="Sense pictograma" style={{fontSize:12,opacity:.7}}>Sense pictograma assignat</span>}
  <strong style={{textAlign:'center'}}>{value||'—'}</strong>{!secondary&&done?<Check size={28}/>:secondary?<ArrowRight size={28}/>:null}
 </article>;
 return <div className="tool-surface"><div className="tool-top"><span>ANTICIPACIÓ VISUAL</span><span className="micro-tag">2 PASSOS</span></div>
 <p className="hint">Tria dues activitats i associa-hi pictogrames del banc compartit.</p>
 <div className="form-grid"><label>Activitat actual<input maxLength={90} value={now} onChange={e=>setNow(e.target.value)}/></label><label>Activitat següent<input maxLength={90} value={next} onChange={e=>setNext(e.target.value)}/></label></div>
 <div className="sequence-grid">{card('01 / ARA',now)}{card('02 / DESPRÉS',next,true)}</div>
 <div className="timer-actions"><button className="action primary" onClick={()=>setDone(!done)}>{done?'Marca com a pendent':'Marca com a fet'}</button><button className="action" onClick={()=>{setNow(next);setNext('');setDone(false)}}><RotateCcw size={17}/> Passa a la següent</button></div>
 <section style={{marginTop:20,borderTop:'1px solid var(--line)',paddingTop:18}}>
 <strong>Banc de pictogrames</strong><p className="hint">Importa el JSON exportat del Gestor de Pictogrames. Les imatges es conservaran en aquest navegador.</p>
 <label className="action" style={{display:'inline-flex',alignItems:'center',gap:8,cursor:'pointer'}}><Upload size={16}/> Importa pictogrames (.json)<input aria-label="Importa pictogrames" type="file" accept=".json,application/json" style={{display:'none'}} onChange={e=>{void importFile(e.target.files?.[0]);e.target.value='';}}/></label>
 {error&&<p role="alert">{error}</p>}
 {pictures.length>0&&<div style={{marginTop:15}}><p className="hint">{pictures.length} pictogrames disponibles</p><div className="form-grid"><label>Assigna el pictograma a<select value={target} onChange={e=>setTarget(e.target.value as 'now'|'next')}><option value="now">ARA</option><option value="next">DESPRÉS</option></select></label><label>Cerca pictogrames<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cerca en català"/></label></div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(115px,1fr))',gap:10,maxHeight:280,overflowY:'auto',marginTop:14}}>{filtered.map(p=><button key={p.id} className="action" onClick={()=>target==='now'?setNow(p.label):setNext(p.label)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:7,minHeight:116,padding:8}}><img src={p.image} alt="" style={{width:76,height:76,objectFit:'contain'}}/><span style={{fontSize:11,textAlign:'center',overflowWrap:'anywhere'}}>{p.label}</span></button>)}</div></div>}
 </section>
 <DocumentBackup value={local.value} onRestore={local.setValue} parse={parseSequence} encode={sequenceDocument} filename="QS33DS_sequencia.json" status={local.status}/>
 </div>;
}
