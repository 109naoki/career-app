import { NextRequest } from 'next/server';

export const createTestRequest = (options?: {
  path?: string;
  search?: string;
  method?: string;
  headers?: HeadersInit;
}) => {
  const basePath = options?.path ?? '/api/admin/posting';
  const baseUrl = `http://localhost${basePath}`;
  const url = new URL(baseUrl);
  
  if (options?.search) {
    url.searchParams.append('search', options.search);
  }

  return new NextRequest(url, {
    method: options?.method || 'GET',
    headers: options?.headers,
  });
};