
import { PrismaClient } from '@prisma/client'
import { seedUsers } from './user'

const prisma = new PrismaClient()

async function main() {
  await seedUsers()
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
