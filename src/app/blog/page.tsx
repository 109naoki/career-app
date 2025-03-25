import { Suspense } from "react";
import { client } from "../lib/microcms";
import { View } from "./View";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ記事一覧 | Career Hub",
  description:
    "キャリア構築に役立つ情報や転職ノウハウを紹介するブログ記事一覧です。",
};

async function getBlogData() {
  const blogs = await client.get({
    endpoint: "blog",
    queries: { limit: 100 },
  });

  return {
    blogs: blogs.contents,
  };
}

export default async function Page() {
  const { blogs } = await getBlogData();

  return (
    <main className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <View blogs={blogs} />
      </Suspense>
    </main>
  );
}
