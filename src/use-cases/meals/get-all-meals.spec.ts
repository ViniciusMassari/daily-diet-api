import { describe, it, beforeEach, expect } from 'vitest';
import { CreateMealUseCase } from './create-meal';
import { MealsRepository } from '@/repositories/meals-repository';
import { InMemoryMealRepository } from '@/repositories/in-memory/in-memory-meal-repository';
import { NotFoundError } from '../errors/NotFound';
import { GetAllMealsUseCase } from './get-all-meals';

describe('create user unit tests', () => {
  const mockId = '1';
  const meal = {
    name: 'meal',
    description: 'description',
    isInDiet: true,
    userId: mockId,
  };

  let mealRepository: MealsRepository;
  let sut: GetAllMealsUseCase;
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository();
    sut = new GetAllMealsUseCase(mealRepository);
  });

  it('Should create a user', async () => {
    await mealRepository.createMeal(meal);
    await mealRepository.createMeal(meal);
    const meals = await sut.execute({ userId: mockId });

    expect(meals).toHaveLength(2);
  });

  it('Should return an empty array', async () => {
    const meals = await sut.execute({ userId: mockId });
    expect(meals).toHaveLength(0);
  });
});
