import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { CreateMealUseCase } from '../meals/create-meal';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUserRepository();
  const useCase = new CreateMealUseCase(mealsRepository, usersRepository);
  return useCase;
}
