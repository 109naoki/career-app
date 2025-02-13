import { GET } from '@/app/api/admin/posting/route';
import type { Posting } from '@prisma/client';
import { NextRequest } from 'next/server';
import { createMockPrismaClient } from '../../mocks/prisma';
import { setupAuthMocks } from '../../mocks/auth';
import { createTestRequest } from '../../mocks/request';

const mockPrisma = createMockPrismaClient();
jest.mock('@/app/lib/prisma', () => ({
  prisma: mockPrisma,
}));

// JWT と headers のモック
jest.mock('jose');
jest.mock('next/headers');

describe('GET /api/admin/posting', () => {
  beforeEach(() => {
    mockPrisma.posting.findMany.mockReset();
    setupAuthMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return a list of postings', async () => {
    const mockPostings: Partial<Posting>[] = [
      { 
        id: "testing-id-1", 
        serviceName: 'Test Posting 1',
        description: 'Test Content 1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "testing-id-2", 
        serviceName: 'Test Posting 2',
        description: 'Test Content 2',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    mockPrisma.posting.findMany.mockResolvedValue(mockPostings as Posting[]);

    const request = new NextRequest(createTestRequest());
    const response = await GET(request);
    const json = await response.json();

    const expectedData = mockPostings.map(post => ({
      ...post,
      createdAt: post.createdAt!.toISOString(),
      updatedAt: post.updatedAt!.toISOString()
    }));

    expect(response.status).toBe(200);
    expect(json.data).toEqual(expectedData);
  
  });

// emptyのテスト
  it('should return an empty array if no postings are found', async () => {
    mockPrisma.posting.findMany.mockResolvedValue([]);

    const request = new NextRequest(createTestRequest());
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual([]);
  });

});