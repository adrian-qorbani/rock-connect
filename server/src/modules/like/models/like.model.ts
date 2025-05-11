import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Like as LikeDB, User as UserDB } from '@prisma/client';
import { User } from 'src/modules/user/models/user.model';

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

  @Field(() => User)
  user: UserDB;
}
