import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Passport } from 'passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    Passport,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: jwtConstants(configService).secret,
        signOptions: { expiresIn: jwtConstants(configService).expiration },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
