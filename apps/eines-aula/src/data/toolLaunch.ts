import {tools} from '../catalog';
export function toolLaunch(search:string){const params=new URLSearchParams(search);const tool=tools.find(t=>t.ready&&t.id===params.get('tool'));return {tool:tool?.id??null,embedded:!!tool&&params.get('embed')==='1'};}
export const panelTools=tools.filter(t=>t.ready).map(t=>({value:`eines-aula/?tool=${t.id}&embed=1`,label:t.name}));
export function standaloneTool(value:string){const url=new URL(value,'https://aula.invalid/');url.searchParams.delete('embed');return url.pathname.slice(1)+url.search;}
export const DEFAULT_PANEL_TOOL='eines-aula/?tool=timer&embed=1';
