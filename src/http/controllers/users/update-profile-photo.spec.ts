import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import path from 'path';
describe('Create an user test', async () => {
  let token: string;
  let id: string;
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

  it('should update profile photo', async () => {
    const createUser = await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });
    id = createUser.body.user.id
    expect(createUser.status).toBe(201);
    const authUser = await request(app.server).post('/user/authenticate').send({
      email: userTestInfo.email,
      password: userTestInfo.password,
    });
    token = authUser.body.token;
    const imagePath = path.join(__dirname, './cat.jpg');
    const response = await request(app.server).patch(`/user/profile-photo/${id}`).set('Authorization', `Bearer ${token}`).send().attach('file',imagePath)

    expect(response.status).toBe(200);
  });
});
