import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

   @InputType()
   export class AuthInput {
     @IsString()
     @MinLength(4)
     @MaxLength(20)
     @Field()
     username: string;

     @IsString()
     @MinLength(4)
     @MaxLength(20)
     @Field()
     password: string;
   }