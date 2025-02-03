import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Posting } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.API_URL}/api/admin/posting`, {
    headers: {
      Authorization: `Bearer ${session!.token}`,
      "Content-Type": "application/json",
    },
  });

  const { data } = await response.json();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">原稿一覧</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="サービス名で検索..."
          className="w-full rounded border p-1.5"
        />
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-300">
        <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] bg-gray-100 p-3 font-semibold text-gray-700">
          <span>サービス名</span>
          <span>説明</span>
          <span>状態</span>
          <span>作成日</span>
          <span>更新日</span>
        </div>

        {data.map((posting: Posting) => (
          <div
            key={posting.id}
            className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] border-t p-3 text-gray-700"
          >
            <span className="truncate">
              <Link
                href={`/postings/${posting.id}`}
                className="text-emerald-600 hover:text-emerald-800"
              >
                {posting.serviceName}
              </Link>
            </span>

            <span className="truncate">
              {posting.description.length > 30
                ? `${posting.description.slice(0, 30)}...`
                : posting.description}
            </span>

            <span
              className={`rounded-md px-2 py-1 text-sm font-semibold ${
                posting.isActive
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {posting.isActive ? "公開" : "下書き"}
            </span>

            <span>{formatDate(posting.createdAt)}</span>

            <span>{formatDate(posting.updatedAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
