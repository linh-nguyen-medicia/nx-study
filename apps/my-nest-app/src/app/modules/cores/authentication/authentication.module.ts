import { Module } from '@nestjs/common';
import process from 'process';
import { IAuthenticationOptions } from '../../../interfaces/authentication-options.interface';
import { OPTIONS__IDP } from '../../../constants/injectors';
import { EnvironmentVariableKeys } from '../../../constants/environment-variable-keys';
import { JwtStrategy } from './strategies/api-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';

@Module({
  imports: [PassportModule, HttpModule, JwtModule],
  providers: [
    {
      provide: OPTIONS__IDP,
      useFactory: (): IAuthenticationOptions => {
        const ignoreExpiration =
          ['1', 1, 'true'].findIndex(
            (x) =>
              x ===
              process.env[
                EnvironmentVariableKeys.JWT__IGNORE_EXPIRATION
              ]?.toLowerCase()
          ) !== -1;
        return {
          audience: process.env[
            EnvironmentVariableKeys.JWT__AUDIENCE
          ] as string,
          ignoreExpiration,
          issuer: process.env[
            EnvironmentVariableKeys.JWT__ISSUER
          ] as string,
          key: process.env[
            EnvironmentVariableKeys.JWT__SIGNING_KEY
          ] as string,
        };
      },
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
    JwtStrategy,
  ],
  exports: [JwtStrategy, JwtModule],
})
export class AuthenticationModule {}
