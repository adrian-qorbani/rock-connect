import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentModel } from './models/comment.model';
import { CreateCommentInput } from './dto/create-comment.input';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from '@prisma/client';
import { GetCommentsByInput } from './dto/get-comments.input';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentModel])
  async getComments(
    @Args('getCommentInput') getCommentInput: GetCommentsByInput,
  ) {
    return this.commentService.getComments({
      postUuid: getCommentInput.postUuid,
      userUuid: getCommentInput.userUuid,
    });
  }

  @Mutation(() => CommentModel)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.commentService.createComment({
      content: createCommentInput.content,
      postUuid: createCommentInput.postUuid,
      username: user.username,
    });
  }
}
