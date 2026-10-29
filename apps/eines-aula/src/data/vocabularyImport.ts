import {vocabulary,type Word} from './vocabulary';
export const VOCABULARY_SCHEMA='qs33ds.eines-vocabulary.v1';
export const MAX_CUSTOM_WORDS=500;
export const MAX_DOCUMENT_WORDS=MAX_CUSTOM_WORDS+vocabulary.length;
const canonical=(s:string)=>s.trim().normalize('NFC').toLocaleLowerCase('ca');
export const wordKey=(s:string)=>canonical(s);
const letters=/^(?=.*\p{L})[\p{L}\p{M}·'’-]+$/u;
export function validateWord(input:unknown):Word{
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Cada entrada ha de ser un objecte amb word i syllables.');
 const item=input as Record<string,unknown>;
 if(typeof item.word!=='string'||!Array.isArray(item.syllables)||item.syllables.length<1||item.syllables.length>8)throw Error('Cal una paraula i entre 1 i 8 síl·labes explícites.');
 const word=canonical(item.word);
 if(!word||word.length>40||!letters.test(word))throw Error('La paraula ha de tenir entre 1 i 40 caràcters, sense espais ni números.');
 const syllables=item.syllables.map(s=>{if(typeof s!=='string')throw Error('Cada síl·laba ha de ser text.');const value=canonical(s);if(!value||value.length>40||!letters.test(value))throw Error('Les síl·labes han de contenir lletres.');return value});
 if(syllables.join('')!==word)throw Error(`Les síl·labes de «${word}» no reconstrueixen la paraula. Revisa accents i separació.`);
 return {word,syllables};
}
export function parseVocabulary(input:unknown):Word[]{
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('El JSON no té el format del banc de vocabulari.');
 const data=input as Record<string,unknown>;
 if(data.schema!==VOCABULARY_SCHEMA||data.language!=='ca'||!Array.isArray(data.words))throw Error('Cal schema qs33ds.eines-vocabulary.v1, language ca i una llista words.');
 if(data.words.length<1||data.words.length>MAX_DOCUMENT_WORDS)throw Error(`El fitxer ha de contenir entre 1 i ${MAX_DOCUMENT_WORDS} paraules, inclòs el banc inicial.`);
 const words=data.words.map((w,i)=>{try{return validateWord(w)}catch(e){throw Error(`Entrada ${i+1}: ${(e as Error).message}`)}});
 const seen=new Set<string>();for(const w of words){const key=wordKey(w.word);if(seen.has(key))throw Error(`La paraula «${w.word}» està repetida dins del fitxer.`);seen.add(key)}return words;
}
export function parseVocabularyText(text:string){if(text.length>1_000_000)throw Error('El fitxer supera el límit d’1 MB.');let data:unknown;try{data=JSON.parse(text)}catch{throw Error('El fitxer no és un JSON vàlid.')}return parseVocabulary(data)}
export function vocabularyDocument(words:Word[]){return {schema:VOCABULARY_SCHEMA,language:'ca',words}}
export function mergeVocabulary(base:Word[],custom:Word[],incoming:Word[]){
 const map=new Map([...base,...custom].map(w=>[wordKey(w.word),w]));const additions:Word[]=[];
 for(const w of incoming){const existing=map.get(wordKey(w.word));if(existing){if(existing.syllables.join('|')!==w.syllables.join('|'))throw Error(`«${w.word}» ja existeix amb una separació diferent. No s’ha incorporat cap entrada.`);continue}additions.push(w);map.set(wordKey(w.word),w)}
 if(custom.length+additions.length>MAX_CUSTOM_WORDS)throw Error('El banc personalitzat no pot superar 500 paraules.');return {custom:[...custom,...additions],added:additions.length,skipped:incoming.length-additions.length};
}
