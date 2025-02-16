import { Suspense } from "react";
import { client } from "./lib/microcms";
import { View } from "./View";

async function getBlogData() {
  const posts = await client.get({
    endpoint: "carrer",
    queries: { limit: 100 },
  });

  const categories = await client.get({
    endpoint: "category",
  });

  return {
    posts: posts.contents,
    categories: categories.contents,
  };
}

export default async function Home() {
  const { posts, categories } = await getBlogData();

  return (
    <main className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <View initialPosts={posts} categories={categories} />
      </Suspense>
    </main>
  );
}
