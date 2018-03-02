import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    components: [
        ProjectService,
        { provide: 'Project', useClass: Project },
    ],
    controllers: [ProjectController],
})
export class ProjectModule { }