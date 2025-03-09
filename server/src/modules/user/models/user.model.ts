import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: UserDB[`id`];

  @Field(() => String)
  username: UserDB[`username`];

  @Field(() => GraphQLISODateTime)
  createdAt: UserDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: UserDB[`updatedAt`];

  @Field(() => String)
  password: UserDB[`password`];

  @Field(() => String, { nullable: true })
  bio: UserDB[`bio`];

  @Field(() => String, { nullable: true })
  profilePicture: UserDB[`profilePicture`];
}
