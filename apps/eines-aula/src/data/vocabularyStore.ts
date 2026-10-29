import {useSyncExternalStore} from 'react';
import {vocabulary,type Word} from './vocabulary';
import {mergeVocabulary,parseVocabulary,vocabularyDocument,wordKey} from './vocabularyImport';
export const VOCABULARY_KEY='qs33ds_eines_vocabulary_v1';
type Snapshot={words:Word[];custom:Word[];warning:string};
const initial:Snapshot={words:vocabulary,custom:[],warning:''};
function read():Snapshot{try{if(typeof localStorage==='undefined')return initial;const raw=localStorage.getItem(VOCABULARY_KEY);if(!raw)return initial;const incoming=parseVocabulary(JSON.parse(raw));const merged=mergeVocabulary(vocabulary,[],incoming);return {words:[...vocabulary,...merged.custom],custom:merged.custom,warning:''}}catch{return {...initial,warning:'No s’ha pogut llegir el banc desat. Es conserva el banc inicial; el fitxer desat no s’ha sobreescrit.'}}}
let state=read();const listeners=new Set<()=>void>();
function notify(){listeners.forEach(l=>l())}
function save(custom:Word[]){let warning='';try{if(typeof localStorage==='undefined')throw Error();if(custom.length)localStorage.setItem(VOCABULARY_KEY,JSON.stringify(vocabularyDocument(custom)));else localStorage.removeItem(VOCABULARY_KEY)}catch{warning='El navegador no permet desar el banc. Les paraules es mantenen en aquesta sessió; exporta-les per conservar-les.'}state={words:[...vocabulary,...custom],custom,warning};notify()}
export function addVocabulary(incoming:Word[]){const result=mergeVocabulary(vocabulary,state.custom,parseVocabulary(vocabularyDocument(incoming)));if(result.added)save(result.custom);return result}
export function removeVocabulary(word:string){save(state.custom.filter(w=>wordKey(w.word)!==wordKey(word)))}
export function getVocabularySnapshot(){return state}
export function useVocabulary(){return useSyncExternalStore(l=>{listeners.add(l);return()=>{listeners.delete(l)}},getVocabularySnapshot,()=>initial)}
if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('storage',e=>{if(e.key===VOCABULARY_KEY||e.key===null){state=read();notify()}});
