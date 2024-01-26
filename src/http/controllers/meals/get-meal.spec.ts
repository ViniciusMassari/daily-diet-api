import { app } from '@/app';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';

describe('get meal test', async () => {
  let token: string;
  let mealId: string;

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

  it('Should update a meal', async () => {
    const createdMeal = await request(app.server)
      .post('/meal/create')
      .set('Authorization', `Bearer ${token}`)
      .send(mealInfo);
    mealId = createdMeal.body.meal.id;

    const response = await request(app.server)
      .get(`/meal/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.meal.name).toEqual(mealInfo.name);
  });
});
