import {apps} from '../dashboard-state';
import {DEFAULT_PANEL_TOOL,panelTools} from './toolLaunch';
export const panelOptions=[...panelTools,...apps.filter(a=>!a[0].startsWith('https:')&&a[0]!=='files/').map(a=>({value:a[0],label:a[1]}))];
export const PREFERENCES_KEY='qs33ds_aula_view_v1';
export type Preferences={quad:boolean;day:number;tool:string};
export function preferences(input:unknown,day=0):Preferences{const v=input as Partial<Preferences>|null;return {quad:v?.quad===true,day:Number.isInteger(v?.day)&&v!.day!>=0&&v!.day!<=4?v!.day!:day,tool:panelOptions.some(t=>t.value===v?.tool)?v!.tool!:DEFAULT_PANEL_TOOL};}
export function readPreferences(day:number):Preferences{try{return preferences(JSON.parse(localStorage.getItem(PREFERENCES_KEY)||'null'),day);}catch{return preferences(null,day);}}
