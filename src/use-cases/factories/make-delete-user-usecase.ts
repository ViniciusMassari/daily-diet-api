import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { DeleteUserUseCase } from '../users/delete-user';

export function makeDeleteUserUseCase() {
  const repository = new PrismaUserRepository();
  const useCase = new DeleteUserUseCase(repository);
  return useCase;
}
