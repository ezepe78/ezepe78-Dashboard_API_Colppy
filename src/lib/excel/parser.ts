import * as XLSX from 'xlsx';
export function parseWorkbook(buffer:ArrayBuffer){const wb=XLSX.read(buffer,{type:'array'});const out:Record<string,Record<string,unknown>[]>={};for(const s of wb.SheetNames){out[s]=XLSX.utils.sheet_to_json(wb.Sheets[s],{defval:null});}return out;}
