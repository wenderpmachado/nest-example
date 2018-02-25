import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let defaultUser: User = new User(0, 'Wender', true);

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            components: [UserService],
            imports: [{
                provide: 'UserRepository',
                useClass: UserRepository
            }]
        }).compile();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            jest.spyOn(userService, 'save').mockImplementation(() => defaultUser);
            const createdUser: User = await userController.create(defaultUser);

            expect(createdUser.id).not.toBe(0);
            expect(createdUser.name).toBeTruthy();
            expect(createdUser.enabled).toBeTruthy(); // Enabled is true in this case;

            defaultUser = createdUser;
        });
    });

    describe('findAll', () => {
        it('should return an array of user', async () => {
            const result: User[] = [defaultUser];
            jest.spyOn(userService, 'findAll').mockImplementation(() => result);
            const foundUsers: User[] = await userController.findAll();

            expect(foundUsers).toBe(result);
        });
    });

    describe('findById', () => {
        it('should return an object of user', async () => {
            jest.spyOn(userService, 'findById').mockImplementation(() => defaultUser);
            const foundUser: User = await userController.findById(defaultUser.id);

            expect(foundUser).toBe(defaultUser);
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            let changedUser: User = new User(defaultUser.id, 'Wender Pinto Machado', false);
            jest.spyOn(userService, 'save').mockImplementation(() => changedUser);
            const updatedUser: User = await userController.update(changedUser);

            expect(updatedUser.id).not.toBe(0);
            expect(updatedUser.name).not.toBe(defaultUser.name);
            expect(updatedUser.enabled).not.toBe(defaultUser.enabled);
            expect(updatedUser.id).toBe(defaultUser.id);

            defaultUser = updatedUser;
        });
    });

    describe('delete', () => {
        it('should delete an existing user', async () => {
            jest.spyOn(userService, 'save').mockImplementation(() => defaultUser);
            const deletedUserResult: boolean = await userController.delete(defaultUser.id);

            expect(deletedUserResult).toBe(true);
        });
    });
});
