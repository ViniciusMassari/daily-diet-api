import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateProfilePhotoUseCase } from '../users/update-profile-photo';

export function makeUpdateProfilePhoto() {
  const repository = new PrismaUserRepository();
  const useCase = new UpdateProfilePhotoUseCase(repository);

  return useCase;
}
