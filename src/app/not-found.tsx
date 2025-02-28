import { Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <div className="bg-background/80 mx-auto max-w-md rounded-lg border p-8 shadow-lg">
        <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-yellow-500" />

        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>

        <p className="text-muted-foreground mb-6 text-xl">
          ページが見つかりませんでした
        </p>

        <p className="text-muted-foreground mb-8">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>

        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 transition-colors"
        >
          <Home className="h-5 w-5" />
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
