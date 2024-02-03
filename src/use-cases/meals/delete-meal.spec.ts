import { describe, it, beforeEach, expect } from 'vitest';

import { hash } from 'bcryptjs';
import { NotFoundError } from '../errors/NotFound';
import { MealsRepository } from '@/repositories/meals-repository';
import { DeleteMealUseCase } from './delete-meal';
import { InMemoryMealRepository } from '@/repositories/in-memory/in-memory-meal-repository';
import { NotAllowedError } from '../errors/NotAllowedError';

describe('create user unit tests', () => {
  const meal = {
    name: 'meal',
    description: 'description',
    isInDiet: true,
    userId: '1',
  };

  let mealRepository: MealsRepository;
  let sut: DeleteMealUseCase;
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository();
    sut = new DeleteMealUseCase(mealRepository);
  });

  it('Should delete a meal', async () => {
    const createdMeal = await mealRepository.createMeal(meal);
    await sut.execute({
      mealId: createdMeal.id,
      userId: meal.userId,
    });
    expect(await mealRepository.getMealById(createdMeal.id)).toBeFalsy();
  });

  it('Should return an error if user is not allowed to delete meal', async () => {
    const createdMeal = await mealRepository.createMeal(meal);

    expect(
      async () =>
        await sut.execute({
          mealId: createdMeal.id,
          userId: '',
        })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
  it('Should return an error if meal was not found', async () => {
    expect(
      async () =>
        await sut.execute({
          mealId: 'fakeId',
          userId: 'fakedId',
        })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
