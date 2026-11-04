'use strict';
const Bridge = (() => {
  const focuses = ['organization','autonomy','reading','general'];
  const metricKeys = ['planned_activities','completed_activities','pending_activities'];
  function fields(value, keys) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).sort().join('|') !== [...keys].sort().join('|')) throw Error('Estructura no vàlida.');
  }
  function metrics(value) {
    fields(value, metricKeys);
    if (!metricKeys.every(k => Number.isInteger(value[k]) && value[k] >= 0 && value[k] <= 100) || value.completed_activities > value.planned_activities || value.pending_activities !== value.planned_activities - value.completed_activities) throw Error('Les activitats no són coherents.');
  }
  function validWeek(week) {
    if (!/^20\d{2}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(week)) return false;
    const year=Number(week.slice(0,4)), number=Number(week.slice(-2));
    const day=new Date(Date.UTC(year,0,4));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7) + (number-1)*7);
    return day.getUTCFullYear()===year;
  }
  function makeRequest(week, focus, planned, completed, id) {
    if (!validWeek(week) || !focuses.includes(focus) || !/^demo_[A-Za-z0-9_-]{1,64}$/.test(id)) throw Error('Revisa la setmana i l’àmbit.');
    const counts={planned_activities:planned,completed_activities:completed,pending_activities:planned-completed};
    metrics(counts);
    return {schema:'qs33ds.portal.ai-bridge.request.v1',mode:'demo',action:'summarize_demo',request_id:id,source:'qs33ds-github-preview',payload:{week,metrics:counts,context:{focus}}};
  }
  function validateResponse(data, pending) {
    if (!pending) throw Error('Genera primer una petició en aquesta sessió. Si has recarregat la pàgina, genera una petició nova.');
    fields(data,['schema','mode','action','status','request_id','metrics','summary','engine']);
    if (data.schema!=='qs33ds.portal.ai-bridge.response.v1' || data.mode!=='demo' || data.action!=='summarize_demo' || data.status!=='ok') throw Error('Resposta desconeguda.');
    if (data.request_id!==pending.request_id) throw Error('La resposta no correspon a la petició pendent.');
    metrics(data.metrics);
    if (!metricKeys.every(k=>data.metrics[k]===pending.payload.metrics[k])) throw Error('Les mètriques no corresponen a la petició.');
    if (typeof data.summary!=='string' || !data.summary.trim() || data.summary.length>2000 || !['local-rules-v1','ollama:qwen3:1.7b'].includes(data.engine)) throw Error('Contingut de resposta no vàlid.');
    return data;
  }
  return {makeRequest,validateResponse,validWeek};
})();
if (typeof module !== 'undefined' && module.exports) module.exports=Bridge;
else {
  const $=id=>document.getElementById(id);
  let pending=null;
  function download(data,name) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
    const link=document.createElement('a'); link.href=url;link.download=name;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('download').onclick=()=>{
    try {
      if (!$('demo').reportValidity()) return;
      const form=$('demo').elements;
      const request=Bridge.makeRequest(form.namedItem('week').value,form.namedItem('focus').value,Number(form.namedItem('planned').value),Number(form.namedItem('completed').value),'demo_'+crypto.randomUUID());
      pending=request;
      $('result').textContent='Esperant el resultat de '+request.request_id+'.';
      download(request,'qs33ds_peticio_demo.json');
      $('downloadstatus').textContent='Petició preparada: '+request.request_id;
    } catch(error) { $('downloadstatus').textContent=error.message; }
  };
  $('resultfile').onchange=async event=>{
    const file=event.target.files[0];if(!file)return;
    try {
      if(file.size>8192)throw Error('Fitxer massa gran (màxim 8 KB).');
      const response=Bridge.validateResponse(JSON.parse(await file.text()),pending);
      const counts=response.metrics;
      $('result').textContent=response.summary+'\n\nPlanificades: '+counts.planned_activities+' · Completades: '+counts.completed_activities+' · Pendents: '+counts.pending_activities+'\nMotor: '+response.engine+'\nPetició: '+response.request_id;
    } catch(error) { $('result').textContent='No es pot llegir la resposta: '+error.message; }
    finally {event.target.value='';}
  };
  $('clear').onclick=()=>{pending=null;$('result').textContent='Cap resultat carregat.';$('downloadstatus').textContent='Petició descartada. Genera una petició nova per continuar.';};
}