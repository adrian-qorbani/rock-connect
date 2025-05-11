export interface User {
  id: string;
  username: string;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  content: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
}
