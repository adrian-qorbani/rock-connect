import { registerEnumType } from '@nestjs/graphql';
import { MediaType } from '@prisma/client';

export { MediaType } from '@prisma/client';

registerEnumType(MediaType, {
  name: 'MediaType',
  description: 'The type of media (post picture or profile picture)',
});
