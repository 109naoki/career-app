import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await prisma.insert.create({
      data: {
        text: 'helloworld',
      },
    });

  
    return NextResponse.json({ message: 'Data inserted successfully', data: result });
  } catch (error) {
    console.error('Error inserting data:', error);

 
    return NextResponse.json({ message: 'Failed to insert data', error }, { status: 500 });
  }
}
