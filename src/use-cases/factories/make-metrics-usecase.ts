import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { MetricsUseCase } from '../users/metrics';
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';

export function makeMetricsUseCase() {
  const repository = new PrismaMealsRepository();
  const useCase = new MetricsUseCase(repository);
  return useCase;
}
