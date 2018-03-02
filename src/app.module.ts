import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ProjectModule } from './project/project.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // UserModule,
    ProjectModule
  ]
})
export class ApplicationModule {
  constructor(private readonly connection: Connection){}
}
