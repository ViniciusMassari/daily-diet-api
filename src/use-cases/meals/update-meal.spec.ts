import { describe, it, beforeEach, expect } from 'vitest';
import { MealsRepository } from '@/repositories/meals-repository';
import { InMemoryMealRepository } from '@/repositories/in-memory/in-memory-meal-repository';
import { UpdateMealUseCase } from './update-meal';
import { NotFoundError } from '../errors/NotFound';

describe('create user unit tests', () => {
  const meal = {
    name: 'meal',
    description: 'description',
    isInDiet: true,
  };
  const newMealInfo = {
    name: 'updated name',
    description: 'updated description',
  };

  let mealRepository: MealsRepository;
  let sut: UpdateMealUseCase;
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository();
    sut = new UpdateMealUseCase(mealRepository);
  });

  it('Should update a meal', async () => {
    const createdMeal = await mealRepository.createMeal(meal);
    const updatedMeal = await sut.execute(newMealInfo, createdMeal.id);

    expect(updatedMeal.name).toStrictEqual(newMealInfo.name);
  });

  it('Should return an error if a meal was not found', async () => {
    expect(
      async () => await sut.execute(newMealInfo, '1')
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
