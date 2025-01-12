import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("認証情報が不足しています");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("ユーザーが見つかりません");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("パスワードが正しくありません");
        }

        // JWTトークンの生成
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "14d" }
        );

        return {
          ...user,
          token,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // maxAge: 14 * 24 * 60 * 60,
    // 5分にして
    maxAge: 5 * 60,
  },
  jwt: {
    // maxAge: 14 * 24 * 60 * 60, // 14日
    maxAge: 5 * 60,
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
        session.token = token.token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
