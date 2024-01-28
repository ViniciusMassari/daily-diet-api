import { app } from '@/app';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';

describe('get all meals test', async () => {
  let token: string;
  let userId: string;

  const mealInfo = {
    name: 'meal name',
    description: 'meal description',
    isInDiet: false,
  };
  const userTestInfo = {
    name: 'testName',
    lastname: 'testLastName',
    email: 'test@example.com',
    password: 'test1234',
  };
  beforeAll(async () => {
    await app.ready();

    const createdUser = await request(app.server).post('/user').send({
      name: userTestInfo.name,
      lastname: userTestInfo.lastname,
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    userId = createdUser.body.user.id;

    const response = await request(app.server).post('/user/authenticate').send({
      email: userTestInfo.email,
      password: userTestInfo.password,
    });

    token = response.body.token;
    await request(app.server)
      .post('/meal/create')
      .set('Authorization', `Bearer ${token}`)
      .send(mealInfo);
    await request(app.server)
      .post('/meal/create')
      .set('Authorization', `Bearer ${token}`)
      .send(mealInfo);
  });

  afterAll(async () => {
    await app.close();
  });
  it('Should return all meals of a user', async () => {
    const response = await request(app.server)
      .get(`/meal/all-meals/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.meals).toHaveLength(2);
  });
});
