import { GET } from '../../../admin/posting/route';
import type { Posting } from '@prisma/client';


const mockFindMany = jest.fn<Promise<Posting[]>, []>();



jest.mock('@/app/lib/prisma', () => ({
  prisma: {
    posting: {
      findMany: (): Promise<Posting[]> => mockFindMany(),
    },
  },
}));

describe('GET /api/admin/posting', () => {
  beforeEach(() => {
 
    mockFindMany.mockReset();
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

    mockFindMany.mockResolvedValue(mockPostings as Posting[]);

    const response = await GET();
    const json = await response.json();
 
    const expectedData = mockPostings.map(post => ({
      ...post,
      createdAt: post.createdAt!.toISOString(),
      updatedAt: post.updatedAt!.toISOString()
    }));
  
    expect(response.status).toBe(200);
    expect(json.data).toEqual(expectedData);
    expect(mockFindMany).toHaveBeenCalledTimes(1);
  });

  it('should return a 500 error if there is a database error', async () => {
    const mockError = new Error('Database error');
    mockFindMany.mockRejectedValue(mockError);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.message).toBe('Failed Fetch data');
    expect(json.error).toBeDefined();
  });

  it('should handle empty results', async () => {
    mockFindMany.mockResolvedValue([]);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.data).toEqual([]);
  });
});
