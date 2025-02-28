import { client } from "@/app/lib/microcms";
import { Blog } from "@/app/types/carrer";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function getBlog(id: string): Promise<Blog> {
  try {
    const data = await client.get({
      endpoint: `blog/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail?.url],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-gray-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ブログ一覧に戻る
          </Link>

          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={blog.created_at}>
                作成日：{blog.created_at.split("T")[0]}
              </time>
            </div>

            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <time dateTime={blog.updated_at}>
                更新日： {blog.updated_at.split("T")[0]}
              </time>
            </div>

            <div className="flex flex-wrap gap-2">
              {blog.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.id}`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition-colors hover:bg-gray-200"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-4xl items-center gap-12">
          {blog.thumbnail && (
            <div className="mx-auto overflow-hidden rounded-xl">
              <Image
                src={blog.thumbnail.url}
                alt={blog.title}
                width={300}
                height={300}
                className="mx-auto object-cover"
              />
            </div>
          )}

          {/* 記事の説明 */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <p className="text-lg leading-relaxed text-gray-700">
              {blog.description}
            </p>
          </div>

          {/* 記事の本文 */}
          <article className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-md bg-gray-200"></div>
              }
            >
              <div className="blog-content text-gray-800">
                {/* 記事コンテンツのスタイルは直接クラス名で対応 */}
                <div dangerouslySetInnerHTML={{ __html: blog.contents }} />
              </div>
            </Suspense>
          </article>

          {/* 記事のフッター */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                ブログ一覧に戻る
              </Link>

              <div className="flex flex-wrap gap-2">
                {blog.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.id}`}
                    className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
