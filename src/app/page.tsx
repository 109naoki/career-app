import Link from "next/link";
import { client } from "./lib/microcms";
import { ApiResponse } from "./types/carrer";

async function getBlogPosts(): Promise<ApiResponse> {
  const data = await client.get({
    endpoint: "carrer",
    queries: {
      limit: 10,
    },
  });
  return data;
}

export default async function Home() {
  const { contents: posts, totalCount } = await getBlogPosts();

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        ブログ記事一覧 ({totalCount}件)
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="rounded-lg border p-4">
            <Link href={`/${post.id}`} className="block">
              <div className="flex gap-4">
                {post.eyecatch && (
                  <img
                    src={post.eyecatch.url}
                    alt={post.title}
                    className="h-24 w-24 rounded object-cover"
                  />
                )}
                <div>
                  <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                  <p className="mb-2 text-gray-600">{post.description}</p>
                  <div className="flex gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category.id}
                        className="rounded bg-gray-100 px-2 py-1 text-sm"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
