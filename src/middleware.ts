import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    
    }

    const token = authHeader.split(' ')[1];


    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'ADMIN') {
      throw new Error('You are not authorized to access this resource');
    }

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error instanceof Error ? error.message : '認証エラー',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const config = {
  matcher: '/api/admin/:path*',
};
