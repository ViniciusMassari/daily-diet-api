import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { UseCase } from './use-case';
import { InvalidData } from './errors/InvalidData';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

interface Input {
  email: string;
  password: string;
}

interface Output {
  user: User;
}

export class RegisterUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: PrismaUserRepository) {}
  async execute(props: Input): Promise<Output> {
    const { email, password } = props;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidData();
    }
    const isSamePassword = await compare(password, user.passwordHash);
    if (!isSamePassword) {
      throw new InvalidData();
    }

    return { user };
  }
}
