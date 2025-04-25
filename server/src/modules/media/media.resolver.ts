import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MediaModel } from './models/media.model';
import { MediaService } from './media.service';
import { CreateMediaInput } from './dto/create-media.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from '../user/models/user.model';

@Resolver(() => MediaModel)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [MediaModel])
  async getMedia() {
    return this.mediaService.getMedia();
  }

  @Mutation(() => MediaModel)
  async createMedia(
    @Args('createMediaInput') createMediaInput: CreateMediaInput,
    @CurrentUser() user: User,
  ) {
    return this.mediaService.createMedia({
      url: createMediaInput.url,
      type: createMediaInput.type,
      userId: user.id,
    });
  }
}
