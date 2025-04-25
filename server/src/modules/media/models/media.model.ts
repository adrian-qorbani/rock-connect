import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User as UserDB, Media as MediaDB } from '@prisma/client';
import { MediaType } from '../media.enum';

@ObjectType()
export class MediaModel {
  @Field(() => Int)
  id: MediaDB[`id`];

  @Field(() => String)
  uuid: MediaDB[`uuid`];

  @Field(() => String)
  url: MediaDB[`url`];

  @Field(() => MediaType)
  type: MediaDB[`type`];

  @Field(() => Int)
  userId: MediaDB[`userId`];

  @Field(() => Int, { nullable: true })
  postId?: MediaDB[`postId`];

  @Field(() => GraphQLISODateTime)
  createdAt: MediaDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: MediaDB[`updatedAt`];
}
