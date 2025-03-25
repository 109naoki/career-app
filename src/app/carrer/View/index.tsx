"use client";
import { FC } from "react";
import { Post } from "@/app/types/carrer";
import { CarrerView } from "@/app/View/CarrerView";
type Props = {
  posts: Post[];
  categories: { id: string; name: string }[];
};

export const View: FC<Props> = ({ posts, categories }) => {
  return (
    <div className="min-h-screen bg-background">
      <CarrerView posts={posts} categories={categories} />
    </div>
  );
};
