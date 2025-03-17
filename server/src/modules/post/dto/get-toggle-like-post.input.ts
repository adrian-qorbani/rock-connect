import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

   @InputType()
   export class GetToggleLikePostInput {
    @IsUUID()
    @IsNotEmpty()
    @Field()
    postUuid: string;
   }