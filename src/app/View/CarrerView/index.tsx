import { Post } from "@/app/types/carrer";
import { useState, useMemo, FC } from "react";
import { CarrerForm } from "./CarrerForm";
import { CarrerList } from "./CarrerList";
import { Pagination } from "../Pagination";

type Props = {
  posts: Post[];
  categories: { id: string; name: string }[];
};
export const CarrerView: FC<Props> = ({ posts, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchMatch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategories.length === 0 ||
        post.categories.some((cat) => selectedCategories.includes(cat.id));

      return searchMatch && categoryMatch;
    });
  }, [posts, searchTerm, selectedCategories]);

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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CarrerForm
        categories={categories}
        selectedCategories={selectedCategories}
        onSearchChange={handleSearchInput}
        onCategoryToggle={toggleCategory}
      />

      <CarrerList posts={currentPosts} totalPosts={filteredPosts.length} />

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
