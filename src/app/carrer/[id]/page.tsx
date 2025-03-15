import { client } from "@/app/lib/microcms";
import { Post } from "@/app/types/carrer";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function getCarrer(id: string): Promise<Post> {
  try {
    const data = await client.get({
      endpoint: `carrer/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const carrer = await getCarrer(id);

  return {
    title: carrer.title,
    description: carrer.description,
    openGraph: {
      title: carrer.title,
      description: carrer.description,
      images: [carrer.eyecatch?.url],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const blog = await getCarrer(id);

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
          <Link href={blog.affLink} target="_blank" rel="noopener noreferrer">
            <h1 className="text-lg font-bold tracking-tight sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>
          </Link>
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
          {blog.eyecatch && (
            <div className="mx-auto overflow-hidden rounded-xl">
              <Link
                href={blog.affLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  width={400}
                  height={400}
                  className="mx-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          )}

          <div className="flex justify-center">
            <Link
              href={blog.affLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <ExternalLink className="h-5 w-5" />
              公式サイト
            </Link>
          </div>

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
                <div dangerouslySetInnerHTML={{ __html: blog.contents }} />
              </div>
            </Suspense>
          </article>
          <div className="flex justify-center">
            <Link
              href={blog.affLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
            >
              <ExternalLink className="h-5 w-5" />
              公式サイト
            </Link>
          </div>

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
