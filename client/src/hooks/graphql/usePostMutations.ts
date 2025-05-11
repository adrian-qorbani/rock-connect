import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../apollo/mutatiuons/postMutations";
import { Post, CreatePostInput } from "../../types/general.types";

export const useCreatePost = () => {
  const [mutate, { data, loading, error }] = useMutation<
    { createPost: Post },
    { createPostInput: CreatePostInput }
  >(CREATE_POST);

  const createPost = async (input: CreatePostInput) => {
    try {
      const result = await mutate({
        variables: { createPostInput: input },
      });
      return result.data?.createPost;
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  };

  return { createPost, data, loading, error };
};
