import { PrismaClient } from '@prisma/client';

type MockPrismaFunction = jest.Mock<any, any>;

export interface MockPrisma extends PrismaClient {
  posting: {
    findMany: MockPrismaFunction;
    create: MockPrismaFunction;
    update: MockPrismaFunction;
    delete: MockPrismaFunction;
  };
}

export const mockPrisma = {
  posting: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as MockPrisma;
