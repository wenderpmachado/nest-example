import { Controller, Get, UseInterceptors, Post, Body, Param, Delete, Put, HttpException, HttpStatus, UsePipes, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NotFoundInterceptor } from '../common/interceptors/notfound.interceptor';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('user')
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
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ title: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    create(@Body() user: User): Promise<User> {
        return this.userService.save(user);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Unidentified user ID.' })
    update(@Body() user: User): Promise<User> {
        if (!user.id) {
            throw new HttpException('Unidentified user ID', HttpStatus.BAD_REQUEST);
        } else {
            return this.userService.save(user);
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'The record has been successfully deleted.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'No user with the informed ID to be excluded' })
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
