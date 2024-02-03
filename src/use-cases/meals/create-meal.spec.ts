import { describe, it, beforeEach, beforeAll, expect } from 'vitest';
import { CreateMealUseCase } from './create-meal';
import { MealsRepository } from '@/repositories/meals-repository';
import { UserRepository } from '@/repositories/user-repository';
import { InMemoryMealRepository } from '@/repositories/in-memory/in-memory-meal-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { NotFoundError } from '../errors/NotFound';

describe('create user unit tests', () => {
  const mockId = '1';
  const meal = {
    name: 'meal',
    description: 'description',
    isInDiet: true,
  };
  const user = {
    name: 'test',
    lastname: 'test',
    email: 'test@example.com',
    bestInDietSequence: 0,
    inDietSequence: 0,
    password: 'test',
  };
  let userRepository: UserRepository;
  let mealRepository: MealsRepository;
  let sut: CreateMealUseCase;
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    mealRepository = new InMemoryMealRepository();
    sut = new CreateMealUseCase(mealRepository, userRepository);
  });

  it('Should create a user', async () => {
    const createdUser = await userRepository.createUser(user);

    const createdMeal = await sut.execute({ ...meal, userId: createdUser.id });

    expect(createdMeal).toBeDefined();
  });

  it('Should return an error if user does not exist', async () => {
    expect(
      async () => await sut.execute({ ...meal, userId: mockId })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
