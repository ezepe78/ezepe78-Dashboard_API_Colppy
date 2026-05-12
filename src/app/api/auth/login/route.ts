import { NextResponse } from 'next/server';import { isValidPassword, setSession } from '@/lib/auth/access-password';
export async function POST(req:Request){const {password}=await req.json(); if(!isValidPassword(password)) return NextResponse.json({ok:false,error:'Contraseña inválida'},{status:401}); await setSession(); return NextResponse.json({ok:true});}
