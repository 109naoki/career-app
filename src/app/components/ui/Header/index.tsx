"use client";

import Link from "next/link";
import { Briefcase, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="inline-block font-bold">JobBoard</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/about"
              className="text-muted-foreground flex items-center text-lg font-medium transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/companies"
              className="text-muted-foreground flex items-center text-lg font-medium transition-colors hover:text-foreground"
            >
              Companies
            </Link>
            <Link
              href="/resources"
              className="text-muted-foreground flex items-center text-lg font-medium transition-colors hover:text-foreground"
            >
              Resources
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground hover:bg-accent rounded-lg p-2.5"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
