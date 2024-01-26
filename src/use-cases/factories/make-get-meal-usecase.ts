import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { GetMealUseCase } from '../meals/get-meal';

export function makeGetMealUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new GetMealUseCase(repository);
  return useCase;
}
