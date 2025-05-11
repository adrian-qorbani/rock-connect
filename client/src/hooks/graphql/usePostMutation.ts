import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../apollo/mutatiuons/postMutations";
import { Post } from "../../types/graphql.types";

export const useCreatePost = () => {
  const [mutate, { loading, error }] = useMutation<
    {
      createPost: Post;
    },
    {
      createPostInput: {
        title: string;
        content: string;
      };
    }
  >(CREATE_POST);

  const createPost = async (input: { title: string; content: string }) => {
    try {
      const { data } = await mutate({
        variables: { createPostInput: input },
      });
      return data?.createPost;
    } catch (err) {
      console.error("Post creation error:", err);
      throw err instanceof Error ? err : new Error("Post creation failed");
    }
  };

  return { createPost, loading, error };
};
