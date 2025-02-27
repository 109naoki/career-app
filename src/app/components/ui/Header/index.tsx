"use client";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="inline-block font-bold">Carrer App</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/about"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              ブログ一覧
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4"></div>
      </div>
    </header>
  );
}
