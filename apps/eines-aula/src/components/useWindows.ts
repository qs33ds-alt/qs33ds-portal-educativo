import {useState} from 'react';
import type {ToolId} from '../catalog';
export type WindowState={id:ToolId;minimized:boolean;x:number;y:number;z:number};
export function constrain(x:number,y:number,width:number,height:number){const windowWidth=Math.min(740,Math.max(0,width-24));const margin=Math.min(12,Math.max(0,width-windowWidth));return {x:Math.max(margin,Math.min(x,Math.max(margin,width-windowWidth-margin))),y:Math.max(0,Math.min(y,Math.max(0,height-80)))}}
export function useWindows(){
 const [items,setItems]=useState<WindowState[]>([]);
 function focus(id:ToolId){setItems(a=>a.map(w=>w.id===id?{...w,z:Math.max(0,...a.map(v=>v.z))+1}:w))}
 return {items,open:(id:ToolId)=>setItems(a=>a.some(w=>w.id===id)?a.map(w=>w.id===id?{...w,minimized:false,z:Math.max(0,...a.map(v=>v.z))+1}:w):[...a,{id,minimized:false,...constrain(40+a.length*28,90+a.length*24,window.innerWidth,window.innerHeight),z:Math.max(0,...a.map(v=>v.z))+1}]),focus,
 minimize:(id:ToolId)=>setItems(a=>a.map(w=>w.id===id?{...w,minimized:true}:w)),
 move:(id:ToolId,x:number,y:number)=>setItems(a=>a.map(w=>w.id===id?{...w,...constrain(x,y,window.innerWidth,window.innerHeight)}:w))};
}
