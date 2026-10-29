// Preferences must never prevent classroom tools from opening.
export function readTheme():'light'|'dark'{try{return localStorage.getItem('eines-appearance-v2')==='dark'?'dark':'light'}catch{return 'light'}}
export function saveTheme(theme:'light'|'dark'){try{localStorage.setItem('eines-appearance-v2',theme)}catch{/* Keep the selected theme for this session. */}}
export function searchText(value:string){return value.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('ca').trim()}
