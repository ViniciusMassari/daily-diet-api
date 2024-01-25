import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UpdateMealUseCase } from '../meals/update-meal';

export function makeUpdateMealUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new UpdateMealUseCase(repository);
  return useCase;
}
