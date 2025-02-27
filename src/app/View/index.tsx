"use client";

import { useState, useMemo, FC } from "react";
import { Blog } from "../types/carrer";
import { HeroSection } from "./HeroSection";
import { SearchForm } from "./SearchForm";
import { BlogList } from "./BlogList";
import { Pagination } from "./Pagination";

type Props = {
  blogs: Blog[];
  categories: { id: string; name: string }[];
};

export const View: FC<Props> = ({ blogs, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const filteredPosts = useMemo(() => {
    return blogs.filter((post) => {
      const searchMatch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategories.length === 0 ||
        post.categories.some((cat) => selectedCategories.includes(cat.id));

      return searchMatch && categoryMatch;
    });
  }, [blogs, searchTerm, selectedCategories]);

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
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchForm
          categories={categories}
          selectedCategories={selectedCategories}
          onSearchChange={handleSearchInput}
          onCategoryToggle={toggleCategory}
        />

        <BlogList posts={currentPosts} totalPosts={filteredPosts.length} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
