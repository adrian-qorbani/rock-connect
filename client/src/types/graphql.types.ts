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

// export interface FeedPost {
//   id: number
//   uuid: string
//   createdAt: string
//   updatedAt: string
//   title: string
//   content: string
//   userId: number
//   user: User
// }

export interface FeedPost {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  userId: number;
  user: User;
  likes: Like[];
  comments: Comment[];
  likesCount: number;
  commentsCount: number;
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
  posts?: [Post];
  followers?: [User];
  following?: [User];
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

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export interface EditUserInput {
  username?: string;
  bio?: string;
  profilePicture?: string;
}

export interface Like {
  id: number;
  createdAt: string;
  userId: number;
  postId: number;
  user: User;
}

export interface Comment {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  userId: number;
  postId: number;
  user: User;
}

export interface LikeModel {
  id: number;
  createdAt: string;
  userId: number;
  postId: number;
  user: User;
}

export interface GetToggleLikePostInput {
  postUuid: string;
}
