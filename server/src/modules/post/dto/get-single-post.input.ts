import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

@InputType()
export class GetSinglePostInput {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  postUuid: string;
}
