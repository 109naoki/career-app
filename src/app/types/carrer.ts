
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


export type Post = {
  id: string;
  affLink: string;
  title: string;
  description: string;
  eyecatch: Image;
  banner: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
  categories: Category[];
  contents: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
export type Thumbnail = {
  url:string
  height:number
  width:number
}

export type Blog = {
  id: string;
  title: string;
  description: string;
  contents:string
  created_at: string;
  updated_at: string;
  thumbnail: Thumbnail;
}


