import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../../src/user/user.module';
import { UserService } from '../../src/user/user.service';
import { ApplicationModule } from '../../src/app.module';
import { Repository } from 'typeorm';

describe('User', () => {
    const server = express();
    const userService = { findAll: () => ['test'] };

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

    it(`/GET user`, () => {
        return request(server)
            .get('/user')
            .expect(200)
            .expect({
                data: userService.findAll(),
            });
    });
});
