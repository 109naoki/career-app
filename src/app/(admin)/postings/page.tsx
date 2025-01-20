import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Posting, Role } from "@prisma/client";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== Role.ADMIN) {
    redirect("/login");
  }
  const response = await fetch(`${process.env.API_URL}/api/admin/posting`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
      "Content-Type": "application/json",
    },
  });

  const { data } = await response.json();
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">原稿一覧</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((posting: Posting) => (
          <div key={posting.id} className="rounded-lg bg-emerald-50 p-6">
            <h3 className="mb-2 font-medium text-emerald-600">
              {posting.serviceName}
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {posting.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
