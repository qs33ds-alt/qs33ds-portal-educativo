export type Category='Gestió'|'Suport'|'Llenguatge'|'Seguiment'|'Materials';
export type ToolId='timer'|'sequence'|'groups'|'autonomy'|'observation'|'syllables'|'words'|'guidelines';
export type Tool={id:ToolId;name:string;category:Category;description:string;ready:boolean;index:string};
export const tools:Tool[]=[
{id:'timer',name:'Temporitzador visual',category:'Gestió',description:'Fes visible el temps i facilita les transicions.',ready:true,index:'01'},
{id:'sequence',name:'Ara i després',category:'Suport',description:'Anticipa què fem ara i què vindrà després.',ready:true,index:'02'},
{id:'groups',name:"Selector d’alumnes",category:'Gestió',description:'Tria àlies i forma parelles per organitzar l’aula.',ready:true,index:'03'},
{id:'autonomy',name:"Llista d’autonomia",category:'Suport',description:'Descompon rutines en passos accessibles.',ready:true,index:'04'},
{id:'observation',name:"Registre d’observació",category:'Seguiment',description:'Registra evidències educatives amb privacitat.',ready:true,index:'05'},
{id:'syllables',name:'Separació sil·làbica',category:'Llenguatge',description:'Compta, separa i ordena síl·labes amb vocabulari revisat.',ready:true,index:'06'},
{id:'words',name:'Banc de paraules',category:'Llenguatge',description:'Cerca lletres i síl·labes escrites en paraules.',ready:true,index:'07'},
{id:'guidelines',name:'Generador de pautes',category:'Materials',description:"Pautes d'escriptura i materials imprimibles.",ready:true,index:'08'}];

export const APP_VERSION='1.6.0';

