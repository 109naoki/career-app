import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  async function createPosting(formData: FormData) {
    "use server";

    const serviceName = formData.get("serviceName") as string;
    const description = formData.get("description") as string;
    const categoryIds = formData
      .getAll("categories")
      .map((id) => parseInt(id as string));

    if (!serviceName || !description || categoryIds.length === 0) {
      throw new Error("必須項目が入力されていません");
    }

    await prisma.posting.create({
      data: {
        serviceName,
        description,
        isActive: false,
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
      },
    });

    return redirect("/postings");
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">新規原稿作成</h1>

      <form action={createPosting} className="space-y-4">
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
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/postings"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
}
