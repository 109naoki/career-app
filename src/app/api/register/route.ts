import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password || !name) {
      return new NextResponse("必須項目が不足しています", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("このメールアドレスは既に登録されています", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("内部エラーが発生しました", { status: 500 });
  }
}
