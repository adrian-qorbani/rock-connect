import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Post as PostDB, User as UserDB, Like as LikeDB, Comment as CommentDB } from '@prisma/client';
import { CommentModel } from 'src/modules/comment/models/comment.model';
import { LikeModel } from 'src/modules/like/models/like.model';
import { User } from 'src/modules/user/models/user.model';

@ObjectType()
export class FeedPost {
  @Field(() => Int)
  id: PostDB[`id`];

  @Field(() => String)
  uuid: PostDB[`uuid`];

  @Field(() => GraphQLISODateTime)
  createdAt: PostDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: PostDB[`updatedAt`];

  @Field(() => String)
  title: PostDB[`title`];

  @Field(() => String)
  content: PostDB[`content`];

  @Field(() => Int)
  userId: PostDB[`userId`];

  @Field(() => User)
  user: UserDB;

  @Field(() => [LikeModel])
  likes: LikeDB

  @Field(() => [CommentModel])
  comments: CommentDB

  @Field(() => Int)
  likesCount: number;

  @Field(() => Int)
  commentsCount: number;
}
