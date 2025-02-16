import dayjs from "dayjs";
import Image from "next/image";
import { client } from "../lib/microcms";
import { notFound } from "next/navigation";
import { Category } from "../types/carrer";

type Props = {
  params: Promise<{ id: string }>;
};

async function getBlogPost(id: string) {
  const data = await client.get({
    endpoint: `carrer/${id}`,
  });
  return data;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }
  const formattedDate = dayjs(post.publishedAt).format("YY.MM.DD");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
        <div className="mb-4 flex items-center gap-4 text-gray-600">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <div className="flex gap-2">
            {post.categories.map((category: Category) => (
              <span
                key={category.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {post.eyecatch && (
        <div className="relative mb-8 aspect-video">
          <Image
            src={post.eyecatch.url}
            alt={post.title}
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
      )}

      {/* 説明文 */}
      <div className="prose mb-8 max-w-none">
        <p className="text-lg text-gray-700">{post.description}</p>
      </div>

      {/* メタ情報 */}
      <div className="mb-8 border-b border-t py-4">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">作成日:</span>{" "}
            {dayjs(post.created_at).format("YYYY年MM月DD日")}
          </div>
          <div>
            <span className="font-semibold">更新日:</span>{" "}
            {dayjs(post.updated_at).format("YYYY年MM月DD日")}
          </div>
        </div>
      </div>

      {/* バナー画像がある場合 */}
      {/* {post.banner && post.banner.length > 0 && (
        <div className="mb-8 grid gap-4">
          {post.banner.map((banner, index) => (
            <div key={index} className="relative aspect-video">
              <Image
                src={banner.url}
                alt={`バナー画像 ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )} */}
    </main>
  );
}

export async function generateStaticParams() {
  const data = await client.get({
    endpoint: "carrer",
    queries: { fields: "id" },
  });

  return data.contents.map((content: { id: string }) => ({
    id: content.id,
  }));
}
