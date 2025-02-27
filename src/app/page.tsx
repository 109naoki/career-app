import { Suspense } from "react";
import { client } from "./lib/microcms";
import { View } from "./View";
import LoadingSpinner from "./components/atoms/LoadingSpinner";

async function getBlogData() {
  // const posts = await client.get({
  //   endpoint: "carrer",
  //   queries: { limit: 100 },
  // });

  const categories = await client.get({
    endpoint: "category",
  });
  const blogs = await client.get({
    endpoint: "blog",
    queries: { limit: 100 },
  });

  return {
    // posts: posts.contents,
    categories: categories.contents,
    blogs: blogs.contents,
  };
}

export default async function Home() {
  const { blogs, categories } = await getBlogData();

  return (
    <main className="p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <View blogs={blogs} categories={categories} />
      </Suspense>
    </main>
  );
}
