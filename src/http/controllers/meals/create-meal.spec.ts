import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Create meal test', async () => {
  let token: string;
  const mealInfo = {
    name: 'meal name',
    description: 'meal description',
    isInDiet: true,
  };
  const userTestInfo = {
    name: 'testName',
    lastname: 'testLastName',
    email: 'test@example.com',
    password: 'test1234',
  };
  beforeAll(async () => {
    await app.ready();

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

    token = response.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should create a meal', async () => {
    const response = await request(app.server)
      .post('/meal/create')
      .set('Authorization', `Bearer ${token}`)
      .send(mealInfo);
    expect(response.statusCode).toBe(201);
    expect(response.body.meal).toBeDefined();

    expect(response.body.updatedUser.inDietSequence).toBe(1);
  });
});
