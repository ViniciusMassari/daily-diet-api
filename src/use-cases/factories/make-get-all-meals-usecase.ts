import { GetAllMealsUseCase } from '../meals/get-all-meals';
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';

export function makeGetAllMealsUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new GetAllMealsUseCase(repository);
  return useCase;
}
