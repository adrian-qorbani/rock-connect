import { useMutation } from "@apollo/client";
import { TOGGLE_POST_LIKE } from "../../apollo/mutatiuons/likeMutations";
import { LikeModel } from "../../types/graphql.types";

export const useToggleLike = () => {
  const [mutate, { loading, error }] = useMutation<
    {
      togglePostLike: LikeModel;
    },
    {
      getToggleLikePostInput: {
        postUuid: string;
      };
    }
  >(TOGGLE_POST_LIKE);

  const toggleLike = async (postUuid: string) => {
    try {
      const { data } = await mutate({
        variables: {
          getToggleLikePostInput: { postUuid },
        },
      });
      return data?.togglePostLike;
    } catch (err) {
      console.error("Like toggle error:", err);
      throw err instanceof Error ? err : new Error("Like toggle failed");
    }
  };

  return { toggleLike, loading, error };
};
