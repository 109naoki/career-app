"use client";
import { useState } from "react";
import Link from "next/link";
import { Briefcase, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="inline-block font-bold">Career Hub</span>
          </Link>
          {/* デスクトップ用ナビゲーション */}
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/carrer"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              サービス
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              ブログ
            </Link>
            <Link
              href="https://docs.google.com/forms/d/1x1rq3uiTPskF3qWEo63LgpO2ahAv9ah2hkzvYB_J8IA"
              className="text-muted-foreground text-md flex items-center font-medium transition-colors hover:text-foreground"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>

        {/* ハンバーガーメニューボタン */}
        <button
          className="mr-4 text-foreground md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* モバイル用メニュー */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container border-t bg-background py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/carrer"
                className="text-md hover:bg-secondary flex items-center justify-center rounded-md py-2 text-center font-medium text-foreground transition-colors"
                onClick={toggleMenu}
              >
                サービス
              </Link>
              <Link
                href="/blog"
                className="text-md hover:bg-secondary flex items-center justify-center rounded-md py-2 text-center font-medium text-foreground transition-colors"
                onClick={toggleMenu}
              >
                ブログ
              </Link>
              <Link
                href="https://docs.google.com/forms/d/1x1rq3uiTPskF3qWEo63LgpO2ahAv9ah2hkzvYB_J8IA"
                className="text-md hover:bg-secondary flex items-center justify-center rounded-md py-2 text-center font-medium text-foreground transition-colors"
                onClick={toggleMenu}
              >
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
