import { promises as fs } from 'node:fs';import path from 'node:path';
const file=path.join(process.cwd(),'.cache','dashboard.json');
export async function readCache(){try{return JSON.parse(await fs.readFile(file,'utf8'));}catch{return null;}}
export async function writeCache(data:unknown){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(data));}
