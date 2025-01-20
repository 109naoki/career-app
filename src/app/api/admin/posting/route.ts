import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {


    const result = await prisma.posting.findMany();

  
    return NextResponse.json({ data: result,status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed Fetch data', error }, { status: 500 });
  }
}
