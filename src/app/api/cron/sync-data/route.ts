import { NextResponse } from 'next/server';import { runSync } from '@/lib/scheduler/sync';
export async function POST(){try{return NextResponse.json(await runSync());}catch(e){return NextResponse.json({ok:false,error:String(e)},{status:500});}}
