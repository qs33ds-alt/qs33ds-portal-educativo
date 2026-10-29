export type Word={word:string;syllables:string[]};
// Explicit editorial syllabification: never infer syllables by splitting letters.
export const vocabulary:Word[]=[
 {word:'casa',syllables:['ca','sa']},{word:'pilota',syllables:['pi','lo','ta']},{word:'taula',syllables:['tau','la']},
 {word:'escola',syllables:['es','co','la']},{word:'mama',syllables:['ma','ma']},{word:'papa',syllables:['pa','pa']},
 {word:'pera',syllables:['pe','ra']},{word:'poma',syllables:['po','ma']},{word:'lluna',syllables:['llu','na']},
 {word:'sabata',syllables:['sa','ba','ta']},{word:'mà',syllables:['mà']},{word:'mar',syllables:['mar']},
 {word:'sol',syllables:['sol']},{word:'gat',syllables:['gat']},{word:'gos',syllables:['gos']},
 {word:'tren',syllables:['tren']},{word:'flor',syllables:['flor']},{word:'platja',syllables:['plat','ja']},
 {word:'aigua',syllables:['ai','gua']},{word:'finestra',syllables:['fi','nes','tra']},{word:'cotxe',syllables:['cot','xe']},
 {word:'llibre',syllables:['lli','bre']},{word:'paper',syllables:['pa','per']},{word:'caramel',syllables:['ca','ra','mel']},
 {word:'cadira',syllables:['ca','di','ra']},{word:'papallona',syllables:['pa','pa','llo','na']}
];
export type Position='any'|'start'|'middle'|'end';
export function normalize(text:string){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('ca').trim()}
export function matchesWritten(word:string,query:string,position:Position){const w=normalize(word),q=normalize(query);if(!q)return true;if(position==='start')return w.startsWith(q);if(position==='end')return w.endsWith(q);if(position==='middle'){for(let i=1;i+q.length<w.length;i++)if(w.slice(i,i+q.length)===q)return true;return false}return w.includes(q)}
