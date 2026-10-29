export type Note={id:string;text:string};
export type Pupil={id:string;name:string;checked:boolean};
export type DashboardState={schedule:string[][];notes:Note[];pupils:Pupil[]};
export const emptyState=():DashboardState=>({schedule:Array.from({length:5},()=>Array(6).fill('')),notes:[],pupils:[]});
export function validateState(value:unknown):DashboardState{
 const v=value as DashboardState;
 if(!v||!Array.isArray(v.schedule)||v.schedule.length!==5||!v.schedule.every(d=>Array.isArray(d)&&d.length===6&&d.every(s=>typeof s==='string'&&s.length<=200))||!Array.isArray(v.notes)||v.notes.length>300||!v.notes.every(n=>n&&typeof n.id==='string'&&typeof n.text==='string'&&n.text.length<=20000)||!Array.isArray(v.pupils)||v.pupils.length>300||!v.pupils.every(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&p.name.length<=200&&typeof p.checked==='boolean'))throw Error('La còpia no té un format compatible.');
 return {schedule:v.schedule,notes:v.notes,pupils:v.pupils};
}
export const apps=[
 ['eines-aula/','Eines d’Aula','Temporitzadors, síl·labes i rutines','◷'],
 ['files/','FILES · El meu núvol','Documents privats i carpetes','☁'],
 ['lecto-publisher.html','LECTO Publisher · v1.3','Quaderns de lectura i escriptura','▤'],
 ['pictogrames.html','Pictogrames','Comunicació i suport visual','◈'],
 ['lecto.html','Lecto','Lectura i fluïdesa','Aa'],
 ['observapt.html','ObservaPT','Observació i seguiment','◎'],
 ['laboratori-nombres.html','Laboratori de nombres','Numeració i càlcul','123'],
 ['referents-escriptura.html','Referents d’escriptura','Vocabulari i autonomia','✎'],
 ['calendari.html','Calendari escolar','Reunions i organització','▦'],
 ['mi-tablon.html','Tauler de notes','Notes i llistes','☑'],
 ['https://qs33ds-alt.github.io/Font-Freda-Diversitat/','Font Freda Diversitat','Suports i coordinació','◇'],
 ['https://qs33ds-alt.github.io/generador-pi-primaria/','Generador PI · v0.88.2','Plans individualitzats','¶']
] as const;

