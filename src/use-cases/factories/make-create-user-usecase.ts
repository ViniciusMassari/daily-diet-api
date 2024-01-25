import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../users/create-user';

export function makeCreateUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new CreateUserUseCase(repository);
  return useCase;
}
