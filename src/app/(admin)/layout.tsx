import type { Metadata } from "next";
import "../globals.css";
import { SessionProviders } from "@/app/lib/provider";
import { Inter } from "next/font/google";
import Sidebar from "../components/ui/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Role } from ".prisma/client";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "../lib/tanstack";

export const metadata: Metadata = {
  title: "管理画面",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== Role.ADMIN) {
    await redirect("/login");
  }

  return (
    <html lang="ja" className="h-full">
      <body className={`${inter.className} flex h-full`}>
        <SessionProviders>
          <TanstackProvider>
            <Toaster />
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <main className="flex-1 p-8">
                <Breadcrumb />
                {children}
              </main>
            </div>
          </TanstackProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
