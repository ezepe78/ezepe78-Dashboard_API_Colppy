import { NextResponse } from 'next/server';import { hasSession } from '@/lib/auth/access-password';
export async function GET(){return NextResponse.json({authenticated:await hasSession()});}
