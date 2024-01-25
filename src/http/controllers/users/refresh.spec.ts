import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
describe('refresh token test', async () => {
  let token: string;
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

  it('should return a new token and refresh token', async () => {
    await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    const authenticateResponse = await request(app.server)
      .post('/user/authenticate')
      .send({
        email: userTestInfo.email,
        password: userTestInfo.password,
      });

    token = authenticateResponse.get('Set-Cookie')[0];

    const response = await request(app.server)
      .patch('/user/token/refresh')
      .set('Cookie', [token])
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      token: expect.any(String),
    });
  });
});
