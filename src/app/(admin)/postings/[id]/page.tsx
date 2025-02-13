import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
type Props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;

  const [posting, categories] = await Promise.all([
    prisma.posting.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!posting) {
    return <div className="text-gray-500">404 Not Found</div>;
  }

  async function updatePosting(formData: FormData) {
    "use server";
    const postingId = formData.get("postingId") as string;
    const serviceName = formData.get("serviceName") as string;
    const description = formData.get("description") as string;
    const isActive = formData.get("isActive") === "true";
    const categoryIds = formData
      .getAll("categories")
      .map((id) => parseInt(id as string));

    if (!serviceName || !description || categoryIds.length === 0) {
      throw new Error("必須項目が入力されていません");
    }

    await prisma.posting.update({
      where: { id: postingId },
      data: {
        serviceName,
        description,
        isActive,
        categories: {
          deleteMany: {},
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    });

    return redirect("/postings");
  }

  async function deletePosting() {
    "use server";

    await prisma.posting.delete({
      where: { id },
    });

    return redirect("/postings");
  }

  const selectedCategoryIds = posting.categories.map(
    ({ category }) => category.id
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">投稿の編集</h1>

      <form action={updatePosting} className="space-y-4">
        <input type="hidden" name="postingId" value={id} />
        <div>
          <label
            htmlFor="serviceName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            サービス名
          </label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            defaultValue={posting.serviceName}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            説明
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={posting.description}
            required
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            カテゴリー（1つ以上選択してください）
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  defaultChecked={selectedCategoryIds.includes(category.id)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            状態
          </label>
          <select
            name="isActive"
            defaultValue={posting.isActive.toString()}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="true">公開</option>
            <option value="false">下書き</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/postings"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            キャンセル
          </Link>
          <DeleteButton onDelete={deletePosting} />
          <button
            type="submit"
            className="rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
}
