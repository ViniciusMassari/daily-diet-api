import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../users/authenticate';

export function makeAuthenticateUserUsecase() {
  const repository = new PrismaUserRepository();
  const useCase = new AuthenticateUseCase(repository);

  return useCase;
}
