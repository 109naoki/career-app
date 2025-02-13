"use client";
import { FC } from "react";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";
import { usePostings } from "@/app/hooks/usePostings";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TableHeader } from "./TableHeader";

const SkeletonRow = () => (
  <div className="grid grid-cols-[2fr_3fr_1fr_1fr_1fr] border-t p-3">
    <div>
      <Skeleton width="75%" height={24} />
    </div>
    <div>
      <Skeleton width="80%" height={24} />
    </div>
    <div>
      <Skeleton width={64} height={24} />
    </div>
    <div>
      <Skeleton width={96} height={24} />
    </div>
    <div>
      <Skeleton width={96} height={24} />
    </div>
  </div>
);

export const View: FC = () => {
  const { data, isLoading, searchTerm, setSearchTerm } = usePostings();

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">データがありません</div>
      );
    }

    return data.map((posting) => (
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
    ));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">原稿一覧</h2>
        <Link href="/postings/new">
          <button className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">
            新規作成
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="サービス名で検索..."
          className="w-full rounded border p-1.5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-300">
        <TableHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default View;
