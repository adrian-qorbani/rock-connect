import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AuthInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  access_token: Scalars["String"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  postId: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["Int"]["output"];
  uuid: Scalars["String"]["output"];
};

export type CreateCommentInput = {
  content: Scalars["String"]["input"];
  postUuid: Scalars["String"]["input"];
};

export type CreatePostInput = {
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type FeedPost = {
  __typename?: "FeedPost";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
  uuid: Scalars["String"]["output"];
};

export type GetCommentsByInput = {
  postUuid?: InputMaybe<Scalars["String"]["input"]>;
  userUuid?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilterUserInput = {
  createdAtFrom?: InputMaybe<Scalars["DateTime"]["input"]>;
  createdAtTo?: InputMaybe<Scalars["DateTime"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFilteredPostsInput = {
  createdAtFrom?: InputMaybe<Scalars["DateTime"]["input"]>;
  createdAtTo?: InputMaybe<Scalars["DateTime"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetFollowerInput = {
  username: Scalars["String"]["input"];
};

export type GetToggleLikePostInput = {
  postUuid: Scalars["String"]["input"];
};

export type LikeModel = {
  __typename?: "LikeModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  postId: Scalars["Int"]["output"];
  userId: Scalars["Int"]["output"];
};

export type LogoutResponse = {
  __typename?: "LogoutResponse";
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  __typename?: "Post";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  userId: Scalars["Int"]["output"];
  uuid: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  filterPosts: Array<Post>;
  filterUsers: Array<User>;
  getAllUsers: Array<User>;
  getComments: Array<Comment>;
  getCurrentUser: User;
  getCurrentUserFeedPosts: Array<FeedPost>;
  getPosts: Array<Post>;
  getUser: User;
};

export type QueryFilterPostsArgs = {
  getFilteredPostsInput: GetFilteredPostsInput;
};

export type QueryFilterUsersArgs = {
  getFilterUserInput: GetFilterUserInput;
};

export type QueryGetCommentsArgs = {
  getCommentInput: GetCommentsByInput;
};

export type QueryGetUserArgs = {
  id: Scalars["Int"]["input"];
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  followers?: Maybe<Array<User>>;
  followersCount: Scalars["Int"]["output"];
  following?: Maybe<Array<User>>;
  followingCount: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  password: Scalars["String"]["output"];
  posts?: Maybe<Array<Post>>;
  postsCount: Scalars["Int"]["output"];
  profilePicture?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
  uuid: Scalars["String"]["output"];
};

export type LoginMutationVariables = Exact<{
  authInput: AuthInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "AuthResponse"; access_token: string };
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; uuid: string };
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: "Query";
  getCurrentUser: {
    __typename?: "User";
    id: number;
    username: string;
    bio?: string | null;
    profilePicture?: string | null;
    uuid: string;
    createdAt: any;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    posts?: Array<{
      __typename?: "Post";
      title: string;
      content: string;
    }> | null;
  };
};

export const LoginDocument = gql`
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      access_token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

export type GetCurrentUserFeedPostsQueryVariables = Exact<{
  [key: string]: never;
}>;
export type GetCurrentUserFeedPostsQuery = {
  __typename?: "Query";
  getCurrentUserFeedPosts: Array<{
    __typename?: "FeedPost";
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: any | null;
    user: {
      __typename?: "User";
      username: string;
    };
  }>;
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      authInput: // value for 'authInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      uuid
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      bio
      profilePicture
      uuid
      createdAt
      followersCount
      followingCount
      postsCount
      posts {
        title
        content
      }
    }
  }
`;

export const GetCurrentUserFeedPostsDocument = gql`
  query GetCurrentUserFeedPosts {
    getCurrentUserFeedPosts {
      id
      title
      content
      userId
      user {
        username
      }
      createdAt
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentUserQuery,
        GetCurrentUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >(GetCurrentUserDocument, options);
}

export function useGetCurrentUserFeedPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserFeedPostsQuery,
    GetCurrentUserFeedPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentUserFeedPostsQuery,
    GetCurrentUserFeedPostsQueryVariables
  >(GetCurrentUserFeedPostsDocument, options);
}

export function useGetCurrentUserFeedPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserFeedPostsQuery,
    GetCurrentUserFeedPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentUserFeedPostsQuery,
    GetCurrentUserFeedPostsQueryVariables
  >(GetCurrentUserFeedPostsDocument, options);
}

export function useGetCurrentUserFeedPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentUserFeedPostsQuery,
        GetCurrentUserFeedPostsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentUserFeedPostsQuery,
    GetCurrentUserFeedPostsQueryVariables
  >(GetCurrentUserFeedPostsDocument, options);
}

export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentUserSuspenseQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;

export type GetCurrentUserFeedPostsQueryHookResult = ReturnType<typeof useGetCurrentUserFeedPostsQuery>;
export type GetCurrentUserFeedPostsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserFeedPostsLazyQuery>;
export type GetCurrentUserFeedPostsSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserFeedPostsSuspenseQuery>;
export type GetCurrentUserFeedPostsQueryResult = Apollo.QueryResult<GetCurrentUserFeedPostsQuery, GetCurrentUserFeedPostsQueryVariables>;