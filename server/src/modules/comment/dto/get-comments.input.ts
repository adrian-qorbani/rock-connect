import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetCommentsByInput {
  @Field({ nullable: true })
  postUuid: string;

  @Field({ nullable: true })
  userUuid: string;
}
