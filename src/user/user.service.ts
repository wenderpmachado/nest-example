import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneById(id);
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.userRepository.deleteById(id);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
}