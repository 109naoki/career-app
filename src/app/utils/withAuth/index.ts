import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export type JWTPayload = {
  role: string;
  sub: string;
  email?: string;
};

type ApiHandler = (
  req: NextRequest,
  payload: JWTPayload
) => Promise<NextResponse>;

export function withAuth(handler: ApiHandler) {
  return async (req: NextRequest) => {
    try {
      const headersList = await headers();
      const authHeader = headersList.get('Authorization');

      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
          { message: 'unauthorized' },
          { status: 401 }
        );
      }

      const token = authHeader.split(' ')[1];
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);

      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== 'ADMIN') {
        return NextResponse.json(
          { message: 'Insufficient permissions' },
            { status: 403 }
        );
      }

      // ハンドラーを呼び出し、認証済みのペイロードを渡す
      return handler(req, payload as JWTPayload);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { message: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
