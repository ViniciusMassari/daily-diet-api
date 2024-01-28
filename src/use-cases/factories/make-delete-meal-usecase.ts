import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { DeleteMealUseCase } from '../meals/delete-meal';

export function makeDeleteMealUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new DeleteMealUseCase(repository);
  return useCase;
}
