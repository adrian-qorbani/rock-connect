import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

   @InputType()
   export class CreatePostInput {
     @IsString()
     @IsNotEmpty()
     @Length(6, 40)
     @Field()
     title: string;

     @IsString()
     @IsNotEmpty()
     @Length(6, 300)
     @Field()
     content: string;
   }