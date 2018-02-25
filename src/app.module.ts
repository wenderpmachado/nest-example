import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule
  ]
})
export class ApplicationModule {}
