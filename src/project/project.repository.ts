import { Project } from './project.schema';
import { MongoRepository } from 'typeorm';

export class ProjectRepository extends MongoRepository<Project>{

}