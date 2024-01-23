import {
  describe,
  it,
  expect,
  afterAll,
  beforeEach,
  beforeAll,
  afterEach,
} from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/lib/prisma';
describe('Authenticate user test', async () => {
  const userTestInfo = {
    name: 'testName',
    lastname: 'testLastName',
    email: 'test@example.com',
    password: 'test1234',
  };
  beforeAll(async () => {
    await app.ready();
  });
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();

    await app.close();
  });

  it('should create an user', async () => {
    const response = await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    expect(response.body.user).toBeDefined();
  });

  it('Should authenticate an user', async () => {
    await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    const response = await request(app.server).post('/user/authenticate').send({
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
