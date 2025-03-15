import { Blog } from "@/app/types/carrer";
import { useState, useMemo, FC } from "react";
import { SearchForm } from "./SearchForm";
import { BlogList } from "./BlogList";
import { Pagination } from "../Pagination";

type Props = {
  blogs: Blog[];
};
export const BlogView: FC<Props> = ({ blogs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const searchMatch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      return searchMatch;
    });
  }, [blogs, searchTerm]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SearchForm onSearchChange={handleSearchInput} />

      <BlogList posts={currentPosts} totalPosts={filteredPosts.length} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
