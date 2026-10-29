import type {CSSProperties} from 'react';
export const styles=[['circular','Circular'],['hourglass',"Rellotge de sorra"],['digital','Digital'],['bar','Barra'],['segments','Segments'],['candle','Espelma'],['orbit','Òrbita'],['steps','Escala']] as const;
export type TimerStyle=typeof styles[number][0];
export default function TimerVisual({style,progress,time}:{style:TimerStyle;progress:number;time:string}){
 const p=Math.max(0,Math.min(1,progress));
 return <div className={'visual visual-'+style} style={{'--fraction':p,'--angle':`${p*360}deg`} as CSSProperties}>
 <div className="visual-drawing" aria-hidden="true">{style==='segments'||style==='steps'?Array.from({length:12},(_,i)=><i key={i} className={i<Math.ceil(p*12)?'filled':''} style={style==='steps'?{height:`${20+i*6}%`}:{}}/>):style==='hourglass'?<><i className="sand top" style={{height:`${p*45}%`}}/><i className="sand bottom" style={{height:`${(1-p)*45}%`}}/></>:style==='candle'?<><i className="wax" style={{height:`${p*90}%`}}/><i className="flame" style={{bottom:`${p*90}%`,opacity:p?1:0}}/></>:style==='orbit'?<i className="planet"/>:null}</div><output className="visual-time" aria-label={`Temps restant: ${time}`}>{time}</output></div>
}
