import { describe, it, beforeEach, expect } from 'vitest';
import { MealsRepository } from '@/repositories/meals-repository';
import { InMemoryMealRepository } from '@/repositories/in-memory/in-memory-meal-repository';
import { GetMealUseCase } from './get-meal';

describe('create user unit tests', () => {
  const mockId = '1';
  const meal = {
    name: 'meal',
    description: 'description',
    isInDiet: true,
    userId: mockId,
  };

  let mealRepository: MealsRepository;
  let sut: GetMealUseCase;
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository();
    sut = new GetMealUseCase(mealRepository);
  });

  it('Should create a user', async () => {
    const createdMeal = await mealRepository.createMeal(meal);
    const meals = await sut.execute({ mealId: createdMeal.id });

    expect(meals).toBeDefined();
  });

  it('Should return undefined', async () => {
    const returnedMeal = await sut.execute({ mealId: '1' });
    expect(returnedMeal).toBeFalsy();
  });
});
