export type Pictogram={id:string;label:string;image:string;category?:string};
export const PICTOGRAM_SCHEMA='qs33ds.pictogrames.v1';
export function parsePictograms(value:unknown):Pictogram[]{
 const root=Array.isArray(value)?value:(value&&typeof value==='object'?value as Record<string,unknown>:null);
 const list=Array.isArray(root)?root:root&&('pictograms'in root?root.pictograms:'pictogrames'in root?root.pictogrames:'items'in root?root.items:null);
 if(!Array.isArray(list)||list.length>2000)throw Error('Cal una llista de pictogrames (màxim 2.000).');
 return list.map((raw,i)=>{
  if(!raw||typeof raw!=='object')throw Error('Pictograma invàlid.');
  const p=raw as Record<string,unknown>;
  const label=String(p.label??p.nom??p.text??p.name??'').trim();
  const image=String(p.image??p.imatge??p.src??p.url??'').trim();
  if(!label||label.length>90||!image||(!/^data:image\/(png|jpeg|webp|svg\+xml);base64,/i.test(image)&&!/^https:\/\//i.test(image)&&!/^\/(?!\/)/.test(image)))throw Error('Pictograma sense text o imatge segura.');
  return {id:String(p.id??i),label,image,category:typeof p.category==='string'?p.category:undefined};
 });
}
export function pictogramKey(text:string){return text.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('ca');}
export function matchPictogram(text:string,items:Pictogram[]){return items.find(p=>pictogramKey(p.label)===pictogramKey(text));}
