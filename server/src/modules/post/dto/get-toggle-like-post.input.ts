import { InputType, Field } from '@nestjs/graphql';

   @InputType()
   export class GetToggleLikePostInput {
    @Field()
    postUuid: string;
   }