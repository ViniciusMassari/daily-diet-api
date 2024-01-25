import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
describe('Create an user test', async () => {
  const userTestInfo = {
    name: 'testName',
    lastname: 'testLastName',
    email: 'test@example.com',
    password: 'test1234',
  };
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an user', async () => {
    const response = await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();
  });
});
