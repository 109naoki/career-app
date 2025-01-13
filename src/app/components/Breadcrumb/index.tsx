"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return { href, label };
  });
  return (
    <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/" className="flex items-center hover:text-emerald-600">
        <Home size={16} className="mr-1" />
        <span>ホーム</span>
      </Link>

      {breadcrumbs.map(({ href, label }) => (
        <div key={href} className="flex items-center">
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link href={href} className="hover:text-emerald-600">
            {label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
