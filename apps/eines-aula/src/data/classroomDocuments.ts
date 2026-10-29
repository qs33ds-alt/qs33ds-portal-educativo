export type Step={text:string;done:boolean};
export type Routine={title:string;steps:Step[]};
export type SequenceState={now:string;next:string;done:boolean};
export const initialRoutine:Routine={title:'LA MEVA RUTINA',steps:['Preparo el material','Escolto les instruccions','Faig l’activitat','Reviso la feina','Recullo el material'].map(text=>({text,done:false}))};
export const initialSequence:SequenceState={now:'Fem una activitat',next:'Descansem',done:false};
function object(input:unknown):Record<string,unknown>{if(!input||typeof input!=='object'||Array.isArray(input))throw Error('El document ha de contenir un objecte.');return input as Record<string,unknown>}
function text(input:unknown,max:number){if(typeof input!=='string'||input.length>max)throw Error(`Hi ha un text invàlid o superior a ${max} caràcters.`);return input}
export function routineDocument(value:Routine){return {schema:'qs33ds.eines-autonomy.v1',...value}}
export function parseRoutine(input:unknown):Routine{const data=object(input);if(data.schema!=='qs33ds.eines-autonomy.v1')throw Error('Aquest document no és una rutina compatible.');if(!Array.isArray(data.steps)||data.steps.length>30)throw Error('La rutina pot tenir un màxim de 30 passos.');return {title:text(data.title,80),steps:data.steps.map(step=>{const s=object(step);if(typeof s.done!=='boolean')throw Error('Cada pas ha de tenir done: true o false.');return {text:text(s.text,120),done:s.done}})}}
export function sequenceDocument(value:SequenceState){return {schema:'qs33ds.eines-sequence.v1',...value}}
export function parseSequence(input:unknown):SequenceState{const data=object(input);if(data.schema!=='qs33ds.eines-sequence.v1'||typeof data.done!=='boolean')throw Error('Aquest document no és una seqüència compatible.');return {now:text(data.now,90),next:text(data.next,90),done:data.done}}
