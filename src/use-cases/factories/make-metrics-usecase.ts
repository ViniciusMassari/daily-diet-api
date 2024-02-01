import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { MetricsUseCase } from '../users/metrics';

export function makeMetricsUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new MetricsUseCase(repository);
  return useCase;
}
