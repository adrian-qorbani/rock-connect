import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Comment as CommentDB } from '@prisma/client';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: CommentDB[`id`];

  @Field(() => String)
  uuid: CommentDB[`uuid`];

  @Field(() => GraphQLISODateTime)
  createdAt: CommentDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: CommentDB[`updatedAt`];

  @Field(() => String)
  content: CommentDB[`content`];

  @Field(() => Int)
  userId: CommentDB[`userId`];

  @Field(() => Int)
  postId: CommentDB[`postId`];
}
