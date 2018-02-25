import { Controller, Get, UseInterceptors, Post, Body, Param, Delete, Put, HttpException, HttpStatus, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NotFoundInterceptor } from '../common/interceptors/notfound.interceptor';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<User> {
        return this.userService.findById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() user: User): Promise<User> {
        return this.userService.save(user);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    update(@Body() user: User): Promise<User> {
        if (!user.id) {
            throw new HttpException('Unidentified user ID', HttpStatus.BAD_REQUEST);
        } else {
            return this.userService.save(user);
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                this.userService.findById(id).then((user: User) => {
                    if (!user) {
                        throw new HttpException('No user with the informed ID to be excluded', HttpStatus.BAD_REQUEST);
                    } else {
                        resolve(this.userService.delete(id));
                    }
                }).catch(error => reject(error));
            } catch (error) { reject(error); }
        });
    }
}
