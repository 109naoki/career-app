import type { Metadata } from "next";
import "../globals.css";
import { SessionProviders } from "@/app/lib/provider";
import { Inter } from "next/font/google";
import Sidebar from "../components/ui/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
  title: "管理画面",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SessionProviders>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8">
              <Breadcrumb />
              {children}
            </main>
          </div>
        </SessionProviders>
      </body>
    </html>
  );
}
