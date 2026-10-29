'use strict';
// Only the public project key belongs in this file. Never use service_role.
class PrivateCloud {
 constructor({url,key,bucket='private-files',request=fetch}) {this.url=url;this.key=key;this.bucket=bucket;this.request=request;this.session=null;this.generation=0;}
 async call(path,{method='GET',body,raw=false}={}) {
  const session=this.session, generation=this.generation;
  if(!session) throw Error('Inicia sesión para acceder a tu nube.');
  const r=await this.request(this.url+path,{method,headers:{apikey:this.key,Authorization:'Bearer '+session.access_token,...(body && !raw?{'Content-Type':'application/json'}:{})},body:body?(raw?body:JSON.stringify(body)):undefined,cache:'no-store'});
  if(generation!==this.generation) throw Error('La sesión ha cambiado.');
  if(!r.ok){let j={};try{j=await r.json()}catch{};throw Error(r.status===401?'La sesión ha caducado. Cierra sesión y vuelve a entrar.':j.message||j.error||'No se pudo completar la operación ('+r.status+').');}
  return r;
 }
 async login(email,password){
  const generation=++this.generation;this.session=null;
  const r=await this.request(this.url+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:this.key,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
  const j=await r.json();if(!r.ok)throw Error('No se pudo iniciar sesión. Comprueba tu cuenta autorizada.');
  if(generation!==this.generation)throw Error('La sesión ha cambiado.');
  this.session=j;
  // Validate identity with Auth, not an editable local field.
  try {const verified=await (await this.call('/auth/v1/user')).json();if(verified.id!==j.user.id)throw Error('Identidad no válida.');}catch(e){this.session=null;throw e;}
  return j.user;
 }
 async logout(){try{if(this.session)await this.call('/auth/v1/logout',{method:'POST'});}finally{this.session=null;this.generation++;}}
 clean(path=''){if(typeof path!=='string'||path.startsWith('/')||path.includes('\\')||/[\x00-\x1f\x7f]/.test(path))throw Error('Ruta no válida.');const parts=path.split('/');if(parts.some(p=>p==='.'||p==='..'))throw Error('Ruta no válida.');return parts.filter(Boolean).join('/');}
 name(name){if(!name||name.includes('/')||name.startsWith('.')||name!==name.trim())throw Error('Usa un nombre sin barras ni punto inicial.');this.clean(name);return name;}
 owned(path=''){if(!this.session)throw Error('Inicia sesión.');return this.session.user.id+'/'+this.clean(path);}
 object(path){return '/storage/v1/object/'+this.bucket+'/'+this.owned(path).split('/').map(encodeURIComponent).join('/');}
 async list(path='') {const generation=this.generation;const result=[];for(let offset=0;;offset+=100){const page=await (await this.call('/storage/v1/object/list/'+this.bucket,{method:'POST',body:{prefix:this.owned(path),limit:100,offset,sortBy:{column:'name',order:'asc'}}})).json();if(generation!==this.generation)throw Error('La sesión ha cambiado.');result.push(...page);if(page.length<100)break;}return result;}
 async entries(path=''){return (await this.list(path)).filter(x=>!x.name.startsWith('.')).map(x=>({name:x.name,directory:!x.id,size:x.metadata?.size??null,modified:Date.parse(x.updated_at)||0}));}
 async upload(path,file){if(file.size>52428800)throw Error('El archivo supera el límite de 50 MB.');await this.call(this.object(path),{method:'POST',body:file,raw:true});}
 async mkdir(path){const name=this.clean(path),parts=name.split('/'),leaf=parts.pop();if((await this.list(parts.join('/'))).some(x=>x.name===leaf))throw Error('Ya existe un elemento con ese nombre.');await this.upload(name+'/.qs33ds-folder',new Blob([''],{type:'application/octet-stream'}));}
 async blob(path){return (await this.call(this.object(path))).blob();}
 async objects(path){const generation=this.generation;const out=[];for(const x of await this.list(path)){if(generation!==this.generation)throw Error('La sesión ha cambiado.');const full=this.clean(path+'/'+x.name);if(x.id)out.push(full);else out.push(...await this.objects(full));}return out;}
 async transfer(source,dest,action='move',directory=false){
  const generation=this.generation;source=this.clean(source);dest=this.clean(dest);if(!['move','copy'].includes(action)||source===dest||dest.startsWith(source+'/'))throw Error('El destino no puede ser el propio elemento ni una subcarpeta suya.');
  // Preflight the destination; do not merge folders or overwrite existing files.
  const parent=dest.split('/').slice(0,-1).join('/'),name=dest.split('/').at(-1);
  if((await this.list(parent)).some(x=>x.name===name))throw Error('Ya existe un elemento con ese nombre en el destino.');
  const objects=directory?await this.objects(source):[source];let completed=0;
  try{for(const object of objects){if(generation!==this.generation)throw Error('La sesión ha cambiado.');await this.call('/storage/v1/object/'+action,{method:'POST',body:{bucketId:this.bucket,sourceKey:this.owned(object),destinationKey:this.owned(dest+object.slice(source.length))}});completed++;}}catch(e){throw Error('Operación incompleta: '+completed+' de '+objects.length+' archivos procesados. '+e.message);}
 }
}
if(typeof module!=='undefined')module.exports=PrivateCloud;
