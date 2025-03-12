import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Like as LikeDB } from '@prisma/client';

@ObjectType()
export class LikeModel {
  @Field(() => Int)
  id: LikeDB[`id`];

  @Field(() => GraphQLISODateTime)
  createdAt: LikeDB[`createdAt`];
  
  @Field(() => Int)
  userId: LikeDB[`userId`];

  @Field(() => Int)
  postId: LikeDB[`postId`];
}

