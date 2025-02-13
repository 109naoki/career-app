import { prisma } from '@/app/lib/prisma';
import { withAuth } from '@/app/utils/withAuth';
import { NextRequest, NextResponse } from 'next/server';
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');

    const result = await prisma.posting.findMany({
      where: search ? {
        OR: [
          {
            serviceName: {
              contains: search,       
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ data: result, status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/posting:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
});