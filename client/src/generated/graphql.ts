export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postUuid: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetCommentsByInput = {
  postUuid?: InputMaybe<Scalars['String']['input']>;
  userUuid?: InputMaybe<Scalars['String']['input']>;
};

export type GetFollowerInput = {
  username: Scalars['String']['input'];
};

export type GetToggleLikePostInput = {
  postUuid: Scalars['String']['input'];
};

export type LikeModel = {
  __typename?: 'LikeModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  followUser: User;
  login: AuthResponse;
  logout: LogoutResponse;
  togglePostLike: LikeModel;
  unfollowUser: User;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationFollowUserArgs = {
  getFollowerInput: GetFollowerInput;
};


export type MutationLoginArgs = {
  authInput: AuthInput;
};


export type MutationTogglePostLikeArgs = {
  getToggleLikePostInput: GetToggleLikePostInput;
};


export type MutationUnfollowUserArgs = {
  getFollowerInput: GetFollowerInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getComments: Array<Comment>;
  getCurrentUser: User;
  getPosts: Array<Post>;
  getUser: User;
};


export type QueryGetCommentsArgs = {
  getCommentInput: GetCommentsByInput;
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', uuid: string } };
