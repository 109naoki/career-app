import { useQuery } from "@tanstack/react-query";
import { Posting } from "@prisma/client";
import { useAuthorizationHeaders } from "@/app/utils/useAuthorizationHeader";
import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useSession } from "next-auth/react";

export const usePostings = (debounceMs = 300) => {
  const { status } = useSession();
  const headers = useAuthorizationHeaders();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  const query = useQuery({
    queryKey: ['postings', debouncedSearchTerm],
    queryFn: async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posting`);
      if (debouncedSearchTerm) {
        url.searchParams.append('search', debouncedSearchTerm);
      }

      const response = await fetch(url.toString(), {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch postings');
      }

      const { data } = await response.json();
      return data as Posting[];
    },
    enabled: status === "authenticated" && !!headers.Authorization,
  });

  return {
    ...query,
    searchTerm,
    setSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
};
