export type Category='Gestió'|'Suport'|'Llenguatge'|'Seguiment'|'Materials';
export type ToolId='timer'|'sequence'|'groups'|'autonomy'|'observation'|'syllables'|'words'|'guidelines';
export type Tool={id:ToolId;name:string;category:Category;description:string;ready:boolean;index:string};
export const tools:Tool[]=[
{id:'timer',name:'Temporitzador Visual',category:'Gestió',description:'Fes visible el temps i facilita les transicions.',ready:true,index:'01'},
{id:'sequence',name:'Ara i Després',category:'Suport',description:'Anticipa què fem ara i què vindrà després.',ready:true,index:'02'},
{id:'groups',name:"Selector d'Alumnes",category:'Gestió',description:'Organitza torns, parelles i petits grups.',ready:true,index:'03'},
{id:'autonomy',name:"Checklist d'Autonomia",category:'Suport',description:'Descompon rutines en passos accessibles.',ready:true,index:'04'},
{id:'observation',name:"Registre d'Observació",category:'Seguiment',description:'Registra evidències educatives amb privacitat.',ready:true,index:'05'},
{id:'syllables',name:'Laboratori de Síl·labes',category:'Llenguatge',description:'Activitats de consciència sil·làbica.',ready:true,index:'06'},
{id:'words',name:'Banc de Paraules per Sons',category:'Llenguatge',description:'Cerca lletres i síl·labes escrites en paraules.',ready:true,index:'07'},
{id:'guidelines',name:'Generador de Pautes',category:'Materials',description:"Pautes d'escriptura i materials imprimibles.",ready:true,index:'08'}];

export const APP_VERSION='1.3.0';

