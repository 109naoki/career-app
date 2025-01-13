import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const SALT_ROUNDS = 10 


export async function seedUsers() {
  const userData = [
    {
      name: 'ユーザ',
      email: 'user@example.com',
      password: 'password123',
    },
    {
      name: '管理者',
      email: 'admin@example.com',
      password: 'password123',
      role: 'ADMIN' as Role,
    },
  ]


  const hashedUserData = await Promise.all(
    userData.map(async (user) => {

      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
      return {
        ...user,
        password: hashedPassword,
      }
    })
  )


  await prisma.user.createMany({
    data: hashedUserData,
    skipDuplicates: true,
  })


}
