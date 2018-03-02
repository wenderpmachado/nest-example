import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

const connectionProvider = { provide: 'ConnectionToken', useValue: null };

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    components: [UserService],
    controllers: [UserController],
})
export class UserModule { }