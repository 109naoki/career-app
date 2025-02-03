"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  StickyNote,
  Settings,
  FileText,
  Menu,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
    { name: "原稿管理", href: "/postings", icon: StickyNote },
    { name: "コンテンツ管理", href: "/contents", icon: FileText },
    { name: "設定", href: "/settings", icon: Settings },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md md:hidden"
      >
        <Menu size={24} className="text-emerald-600" />
      </button>

      <aside
        className={`
        fixed left-0 top-0 z-40 h-screen w-64 transform bg-white
        shadow-lg transition-transform duration-200 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-xl font-bold text-emerald-600">管理画面</h1>
        </div>

        <nav className="flex flex-col space-y-2 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-2 rounded-lg px-4 py-2
                  ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  }
                `}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => signOut()}
            className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
            <span>ログアウト</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
