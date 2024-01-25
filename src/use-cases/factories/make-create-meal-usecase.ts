import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { CreateMealUseCase } from '../meals/create-meal';

export function makeCreateMealUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new CreateMealUseCase(repository);
  return useCase;
}
