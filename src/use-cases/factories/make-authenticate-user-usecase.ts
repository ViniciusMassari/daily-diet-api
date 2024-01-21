import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '../register';

export function makeAuthenticateUserUsecase() {
  const repository = new PrismaUserRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
}
