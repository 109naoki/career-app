import { Suspense } from "react";
import { client } from "../lib/microcms";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import { Metadata } from "next";
import { View } from "./View";

export const metadata: Metadata = {
  title: "サービス一覧 | Career Hub",
  description: "キャリア構築に役立つ情報を紹介するサービス一覧です。",
};

async function getCarrerData() {
  const posts = await client.get({
    endpoint: "carrer",
    queries: { limit: 100 },
  });
  const categories = await client.get({
    endpoint: "category",
    queries: { limit: 100 },
  });
  return {
    posts: posts.contents,
    categories: categories.contents,
  };
}

export default async function Page() {
  const { posts, categories } = await getCarrerData();

  return (
    <main className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <View posts={posts} categories={categories} />
      </Suspense>
    </main>
  );
}
