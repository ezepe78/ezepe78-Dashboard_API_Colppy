import { cookies } from 'next/headers';
const COOKIE_NAME='cepyme_session';
export function isValidPassword(input:string){return !!process.env.APP_ACCESS_PASSWORD && input===process.env.APP_ACCESS_PASSWORD;}
export async function hasSession(){return (await cookies()).get(COOKIE_NAME)?.value==='ok';}
export async function setSession(){(await cookies()).set(COOKIE_NAME,'ok',{httpOnly:true,sameSite:'lax',secure:true,path:'/'});}
export async function clearSession(){(await cookies()).delete(COOKIE_NAME);}
