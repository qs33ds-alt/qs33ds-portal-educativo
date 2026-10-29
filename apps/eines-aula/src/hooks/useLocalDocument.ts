import {useCallback,useEffect,useState} from 'react';
import type {Dispatch,SetStateAction} from 'react';
export function useLocalDocument<T>(key:string,initial:T,parse:(input:unknown)=>T,encode:(value:T)=>unknown){
 const [loaded]=useState(()=>{try{if(typeof localStorage==='undefined')return {value:initial,status:'Es desarà només en aquest navegador.'};const raw=localStorage.getItem(key);return raw?{value:parse(JSON.parse(raw)),status:'Còpia local recuperada.'}:{value:initial,status:'Es desarà només en aquest navegador.'}}catch{return {value:initial,status:'No s’ha pogut recuperar la còpia local. No s’ha sobreescrit; pots importar una còpia JSON.'}}});
 const [value,setValue]=useState<T>(loaded.value),[dirty,setDirty]=useState(false),[status,setStatus]=useState(loaded.status);
 const update:Dispatch<SetStateAction<T>>=useCallback(next=>{setDirty(true);setValue(next)},[]);
 useEffect(()=>{if(!dirty)return;try{localStorage.setItem(key,JSON.stringify(encode(value)));setStatus('Desat en aquest navegador.')}catch{setStatus('No s’ha pogut desar. Exporta una còpia JSON per conservar els canvis.')}},[value,dirty,key,encode]);
 return {value,setValue:update,status};
}
