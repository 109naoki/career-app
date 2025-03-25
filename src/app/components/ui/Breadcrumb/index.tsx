"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { getCustomBreadcrumb } from "../../../utils/breadcrumb";

export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  dynamicParams?: Record<string, string>;
};

export function Breadcrumb({
  items = [],
  showHome = true,
  dynamicParams,
}: BreadcrumbProps) {
  const pathname = usePathname();

  // カスタムパンくずリストの取得を試みる
  const customItems = getCustomBreadcrumb(pathname, dynamicParams);

  // カスタムアイテムがあればそれを使用し、なければpropsのitemsまたは自動生成
  const providedItems = customItems || items;

  const pathSegments = pathname.split("/").filter(Boolean);

  // パスからパンくずリストを自動生成する場合の処理
  const generatedItems: BreadcrumbItem[] = [];

  if (providedItems.length === 0 && pathSegments.length > 0) {
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // パスセグメントをラベルに変換（キャメルケースや-区切りを読みやすくする）
      let label = segment
        .replace(/-/g, " ")
        .replace(/([A-Z])/g, " $1")
        .trim();

      // 最初の文字を大文字に
      label = label.charAt(0).toUpperCase() + label.slice(1);

      generatedItems.push({
        label,
        href: currentPath,
        isCurrent: index === pathSegments.length - 1,
      });
    });
  }

  const breadcrumbItems =
    providedItems.length > 0 ? providedItems : generatedItems;

  if (breadcrumbItems.length === 0 && pathname === "/") {
    return null; // ホームページの場合は表示しない
  }

  return (
    <nav aria-label="パンくずリスト" className="w-full py-2 text-sm">
      <ol className="flex flex-wrap items-center gap-1">
        {showHome && (
          <li className="flex items-center">
            <Link
              href="/"
              className="text-muted-foreground flex items-center hover:text-foreground"
              aria-label="ホーム"
            >
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbItems.length > 0 && (
              <ChevronRight className="text-muted-foreground mx-1 h-4 w-4" />
            )}
          </li>
        )}

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {item.isCurrent ? (
              <span className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRight className="text-muted-foreground mx-1 h-4 w-4" />
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
