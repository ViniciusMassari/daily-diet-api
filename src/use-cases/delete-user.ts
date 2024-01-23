import { Prisma } from '@prisma/client';
import { UseCase } from './use-case';
import { UserRepository } from '@/repositories/user-repository';

interface Input {
  id: string;
}

type Output = void;

export class DeleteUserUseCase implements UseCase<Input, Output> {
  constructor(private userRepository: UserRepository<Prisma.UserCreateInput>) {}
  async execute(props: Input): Promise<Output> {
    const user = await this.userRepository.findById(props.id);
    if (!user) {
      throw new NotFoundError();
    }

    if (user.id) await this.userRepository.deleteUser(user.id);
    return;
  }
}