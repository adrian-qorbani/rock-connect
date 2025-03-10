import { ConfigService } from '@nestjs/config';

export const jwtConstants = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  expiration: configService.get<string>('JWT_EXPIRES'),
});
