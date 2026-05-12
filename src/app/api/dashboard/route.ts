import { NextResponse } from 'next/server';import { readCache } from '@/lib/cache/file-cache';
export async function GET(){const data=await readCache(); if(!data) return NextResponse.json({ok:false,error:'Sin caché disponible. Reintente sincronizar.'},{status:503}); return NextResponse.json({ok:true,data});}
