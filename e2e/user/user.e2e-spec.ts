import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../../src/user/user.module';
import { UserService } from '../../src/user/user.service';
import { ApplicationModule } from '../../src/app.module';
import { Repository } from 'typeorm';
import { User } from '../../src/user/user.entity';

describe('User', () => {
    const server = express();
    let defaultUser: User = new User(0, 'Wender', true);
    const changedUser: User = new User(0, 'Wender Pinto Machado', false);
    const userService = {
        create: (user: User) => { defaultUser.id = 1; changedUser.id = 1; return defaultUser; },
        findAll: () => [defaultUser],
        findById: (id: number) => defaultUser,
        update: (user: User) => changedUser,
        delete: (id: number) => { true }
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                UserModule,
                {
                    provide: 'UserRepository',
                    useClass: Repository
                }
            ],
        })
        .overrideComponent(UserService).useValue(userService)
        .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`/POST user`, () => {
        return request(server)
            .post('/user', defaultUser)
            .expect(200)
            .expect({
                data: userService.create(defaultUser),
            });
    });

    it(`/GET user`, () => {
        return request(server)
            .get('/user')
            .expect(200)
            .expect({
                data: userService.findAll(),
            });
    });

    it(`/GET/1 user`, () => {
        return request(server)
            .get('/user/1')
            .expect(200)
            .expect({
                data: userService.findById(defaultUser.id),
            });
    });

    it(`/PUT user`, () => {
        return request(server)
            .put('/user', changedUser)
            .expect(200)
            .expect({
                data: userService.update(changedUser),
            });
    });

    it(`/DELETE user`, () => {
        return request(server)
            .delete('/user/1')
            .expect(200)
            .expect({
                data: userService.delete(defaultUser.id),
            });
    });
});
