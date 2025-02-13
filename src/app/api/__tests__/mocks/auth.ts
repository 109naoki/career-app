import { headers } from 'next/headers';
import { jwtVerify } from 'jose';

export const mockJwtVerify = jwtVerify as jest.Mock;
export const mockHeaders = headers as jest.Mock;

export const setupAuthMocks = (options?: {
  role?: string;
  token?: string;
  includeAuth?: boolean;
}) => {
  const role = options?.role ?? 'ADMIN';
  const token = options?.token ?? 'valid-token';
  const includeAuth = options?.includeAuth ?? true;

  mockJwtVerify.mockResolvedValue({
    payload: { role },
  });

  const headerMap = new Map();
  if (includeAuth) {
    headerMap.set('Authorization', `Bearer ${token}`);
  }
  mockHeaders.mockReturnValue(headerMap);
};
