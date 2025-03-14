import { Module } from '@nestjs/common';
import { UsersModule } from './modules/features/users/users.module';
import { AuthenticationModule } from './modules/cores/authentication/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
