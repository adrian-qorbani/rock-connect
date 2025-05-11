export interface CreatePostInput {
  title: string;
  content: string;
}

export interface Post {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  userId: number;
}

export interface AuthInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id?: number;
  uuid?: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  bio?: string;
  profilePicture?: string;
  posts?: string;
  followers?: string;
  following?: string;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
}