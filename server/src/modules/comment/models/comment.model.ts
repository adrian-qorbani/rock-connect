import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Comment as CommentDB, User as UserDB } from '@prisma/client';
import { User } from 'src/modules/user/models/user.model';

@ObjectType()
export class CommentModel {
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

  @Field(() => User)
  user: UserDB;
}
