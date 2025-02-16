
export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};


type Image = {
  url: string;
  height: number;
  width: number;
};


type Post = {
  id: string;
  title: string;
  description: string;
  eyecatch: Image;
  banner: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};


export type ApiResponse = {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
};