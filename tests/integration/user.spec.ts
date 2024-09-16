import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@modules/app.module';
import { TestModule } from '@modules/test/test.module';
import { TestSetupService } from '../setupTests';
import { GenderEnum } from '@core/domain/enums/user.enum';
import { generateToken } from '@shared/utils/jwt';

describe('User (e2e)', () => {
  let app: INestApplication;
  let testSetupService: TestSetupService;
  let authorization: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    authorization = generateToken();

    app = moduleFixture.createNestApplication();
    await app.init();

    testSetupService = moduleFixture.get(TestSetupService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /users', async () => {
    const newUser = {
      name: 'Tony Stark',
      alias: 'Iron Man',
      document: '42133654097',
      birthDate: '1970-05-11',
      gender: GenderEnum.MALE,
    };

    const response = await request(app.getHttpServer())
      .post(`/users`)
      .set('authorization', authorization)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('/GET /users', async () => {
    await testSetupService.setupUser({
      name: 'Selina Kyle',
      alias: 'Catwoman',
      document: '66007950000',
      birthDate: '1940-04-10',
      gender: GenderEnum.FEMALE,
    });

    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('authorization', authorization);

    expect(response.status).toBe(200);
  });

  it('/GET /users/:id', async () => {
    const { uuid } = await testSetupService.setupUser({
      name: 'Thor',
      alias: 'God of Thunder',
      document: '85985238016',
      birthDate: '1000-04-10',
      gender: GenderEnum.MALE,
    });

    const response = await request(app.getHttpServer()).get(`/users/${uuid}`);

    expect(response.status).toBe(200);
  });

  it('/DELETE /users/:id', async () => {
    const { uuid } = await testSetupService.setupUser({
      name: 'Diana Prince',
      alias: 'Wonder Woman',
      document: '98765432100',
      birthDate: '1941-10-21',
      gender: GenderEnum.FEMALE,
    });

    const response = await request(app.getHttpServer()).delete(
      `/users/${uuid}`,
    );

    expect(response.status).toBe(204);
  });
});
