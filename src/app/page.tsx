import { Suspense } from "react";
import { client } from "./lib/microcms";
import { View } from "./View";
import LoadingSpinner from "./components/atoms/LoadingSpinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "あなたの強みを活かせる転職先が見つかる｜無料で使える転職アプリ｜Career Hub",
  description:
    "転職や副業を考えているあなたに、最適な求人とキャリアの選択肢をご提案。無料で使える転職支援アプリ Career Hub で一歩を踏み出そう。",
};

async function getBlogData() {
  const posts = await client.get({
    endpoint: "carrer",
    queries: { limit: 100 },
  });

  const categories = await client.get({
    endpoint: "category",
    queries: { limit: 100 },
  });
  const blogs = await client.get({
    endpoint: "blog",
    queries: { limit: 100 },
  });

  return {
    posts: posts.contents,
    categories: categories.contents,
    blogs: blogs.contents,
  };
}

export default async function Page() {
  const { posts, blogs, categories } = await getBlogData();

  return (
    <main className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <View posts={posts} blogs={blogs} categories={categories} />
      </Suspense>
    </main>
  );
}
