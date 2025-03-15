"use client";
import { FC } from "react";
import { Blog, Post } from "../types/carrer";
import { HeroSection } from "./HeroSection";
import { BlogView } from "./BlogView";
import { CarrerView } from "./CarrerView";

type Props = {
  posts: Post[];
  blogs: Blog[];
  categories: { id: string; name: string }[];
};

export const View: FC<Props> = ({ posts, blogs, categories }) => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CarrerView posts={posts} categories={categories} />
      <BlogView blogs={blogs} />
    </div>
  );
};
