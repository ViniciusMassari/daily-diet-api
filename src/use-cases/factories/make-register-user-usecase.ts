import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '../register';

export function makeRegisterUserUsecase() {
  const repository = new PrismaUserRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
}
