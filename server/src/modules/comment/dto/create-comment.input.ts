import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field()
  postUuid: string;
}
