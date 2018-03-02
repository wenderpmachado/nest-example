import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.schema';
import { ProjectRepository } from './project.repository';

@Component()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: ProjectRepository,
    ) { }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async findById(id: number): Promise<Project> {
        return await this.projectRepository.findOneById(id);
    }

    async save(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.projectRepository.deleteById(id);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}
