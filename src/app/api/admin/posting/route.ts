// app/api/admin/posting/route.ts
import { prisma } from '@/app/lib/prisma';
import { withAuth } from '@/app/utils/withAuth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    // 総件数を取得
    const totalCount = await prisma.posting.count({
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
    });

    // ページネーションを適用したデータ取得
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
      include: {
        categories: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({ 
      data: result,
      metadata: {
        totalCount,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit)
      },
      status: 200 
    });
  } catch (error) {
    console.error('Error in GET /api/admin/posting:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
});