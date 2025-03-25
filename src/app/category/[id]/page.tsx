import { client } from "@/app/lib/microcms";
import { Post } from "@/app/types/carrer";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Tag } from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";

type Props = {
  params: Promise<{ id: string }>;
};

async function getCategoryPosts(id: string) {
  try {
    const data = await client.get({
      endpoint: "carrer",
      queries: {
        filters: `categories[contains]${id}`,
        limit: 100,
      },
    });

    const category = await client.get({
      endpoint: "category",
      contentId: id,
    });

    return {
      posts: data.contents,
      category: category,
    };
  } catch (error) {
    console.error("カテゴリー記事取得エラー:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { category } = await getCategoryPosts(id);

  return {
    title: `${category.name}のサービス一覧 | Career Hub`,
    description: `${category.name}に関連するキャリア構築サービスの一覧です。`,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const { posts, category } = await getCategoryPosts(id);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-gray-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            トップページに戻る
          </Link>

          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {category.name}のサービス一覧
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <Link
                key={post.id}
                href={`/carrer/${post.id}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg"
              >
                {post.eyecatch && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.eyecatch.url}
                      alt={post.title}
                      width={600}
                      height={340}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 text-gray-600">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  );
}
