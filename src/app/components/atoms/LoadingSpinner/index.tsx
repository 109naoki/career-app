"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
      <Loader2 className="text-primary mb-4 h-12 w-12 animate-spin" />
      <p className="text-muted-foreground text-lg">コンテンツを読み込み中...</p>
    </div>
  );
}
