import { Controller, Get, UseInterceptors, Post, Body, Param, Delete, Put, HttpException, HttpStatus, UsePipes, HttpCode } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.schema';
import { NotFoundInterceptor } from '../common/interceptors/notfound.interceptor';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';

@ApiBearerAuth()
@ApiUseTags('project')
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Project> {
        return this.projectService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    @ApiOperation({ title: 'Create project' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    create(@Body() project: Project): Promise<Project> {
        return this.projectService.save(project);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Unidentified project ID.' })
    update(@Body() project: Project): Promise<Project> {
        if (!project.id) {
            throw new HttpException('Unidentified project ID', HttpStatus.BAD_REQUEST);
        } else {
            return this.projectService.save(project);
        }
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'The record has been successfully deleted.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'No project with the informed ID to be excluded' })
    delete(@Param('id') id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                this.projectService.findById(id).then((project: Project) => {
                    if (!project) {
                        throw new HttpException('No project with the informed ID to be excluded', HttpStatus.BAD_REQUEST);
                    } else {
                        resolve(this.projectService.delete(id));
                    }
                }).catch(error => reject(error));
            } catch (error) { reject(error); }
        });
    }
}
