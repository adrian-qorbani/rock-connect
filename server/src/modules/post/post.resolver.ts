import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorator/public.decorator';
import { User } from 'src/common/decorator/user.decorator';
import { Post } from 'src/modules/post/models/post.model';
import { PostService } from 'src/modules/post/post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Query(() => [Post])
  async getPosts() {
    return this.postService.getPosts();
  }

  @Mutation(() => Post)
  async createPost(
    // @User()
    @Args({ name: `title`, type: () => String })
    title: string,
    @Args({ name: `content`, type: () => String }) content: string,
    @Args({ name: `userId`, type: () => Int }) userId: number,
  ) {
    return this.postService.createPost({ title, content, userId });
  }

  @Mutation(() => Post)
  async editPost(
    @Args({ name: `id`, type: () => Int, nullable: true }) postId: number,
    @Args({ name: `title`, type: () => String, nullable: true }) title?: string,
    @Args({ name: `content`, type: () => String, nullable: true })
    content?: string,
  ) {
    return this.postService.editPost({ postId, title, content });
  }

  @Mutation(() => Post)
  async deletePost(@Args({ name: `postId`, type: () => Int }) postId: number) {
    return this.postService.deletePost({ postId });
  }
}
