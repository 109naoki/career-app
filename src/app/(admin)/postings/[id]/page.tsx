import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Form } from "./Form";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  if (!session) {
    return redirect("/login");
  }

  const posting = await prisma.posting.findUnique({
    where: { id },
  });

  if (!posting || !id) {
    return <div className="text-gray-500">404 Not Found</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {posting.serviceName}
      </h2>
      <p className="text-lg text-gray-700">{posting.description}</p>

      <Form token={session.token} id={id} />
    </div>
  );
}
