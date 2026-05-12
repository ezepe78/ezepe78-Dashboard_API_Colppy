export type Period={from?:Date;to?:Date};
export const currentMonth=()=>{const n=new Date();return {from:new Date(n.getFullYear(),n.getMonth(),1),to:new Date(n.getFullYear(),n.getMonth()+1,0)};};
export function inRange(date:string|Date,p:Period){const d=new Date(date); if(Number.isNaN(d.getTime())) return false; if(p.from&&d<p.from) return false; if(p.to&&d>p.to) return false; return true;}
