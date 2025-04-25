import { InputType, Field } from '@nestjs/graphql';
import { MediaType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMediaInput {
  @Field()
  @IsString()
  url: string;

  @Field(() => MediaType)
  @IsEnum(MediaType, {
    message: `Invalid media type. Valid values are: ${Object.values(MediaType).join(', ')}`,
  })
  type: MediaType;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  postId?: number;
}
