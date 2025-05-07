import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class UploadUserProfilePic {
  @IsString()
  @IsNotEmpty()
  @Length(5, 60)
  @Field()
  s3url: string;
}
