"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  token: string;
  id: string;
};
export const Form: FC<Props> = ({ token, id }) => {
  const router = useRouter();
  const deletePosting = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posting/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("削除に成功しました");
      router.push("/postings");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deletePosting();
      }}
    >
      <button
        type="submit"
        className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-700"
      >
        削除
      </button>
    </form>
  );
};
