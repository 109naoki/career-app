// app/hooks/usePostings.ts
import { useQuery } from "@tanstack/react-query";
import { Posting, Category } from "@prisma/client";
import { useAuthorizationHeaders } from "@/app/utils/useAuthorizationHeader";
import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useSession } from "next-auth/react";

export type PostingWithCategories = Posting & {
  categories: {
    category: Category;
  }[];
};

type PaginationMetadata = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

type PostingsResponse = {
  data: PostingWithCategories[];
  metadata: PaginationMetadata;
};

export const usePostings = (limit = 5) => {
  const { status } = useSession();
  const headers = useAuthorizationHeaders();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const query = useQuery({
    queryKey: ['postings', debouncedSearchTerm, currentPage, limit],
    queryFn: async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posting`);
      if (debouncedSearchTerm) {
        url.searchParams.append('search', debouncedSearchTerm);
      }
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', limit.toString());

      const response = await fetch(url.toString(), {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch postings');
      }

      return await response.json() as PostingsResponse;
    },
    enabled: status === "authenticated" && !!headers.Authorization,
  });

  return {
    data: query.data?.data,
    metadata: query.data?.metadata,
    isLoading: query.isLoading,
    error: query.error,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
};