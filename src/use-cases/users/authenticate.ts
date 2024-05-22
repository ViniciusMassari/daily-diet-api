import { UseCase } from '../use-case';
import { InvalidData } from '../errors/InvalidData';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { UserRepository } from '@/repositories/user-repository';
import { NotFoundError } from '../errors/NotFound';

interface Input {
  email: string;
  password: string;
}

interface Output {
  user: User;
}

export class AuthenticateUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: UserRepository) {}
  async execute(props: Input): Promise<Output> {
    const { email, password } = props;
    
    const user = await this.usersRepository.findByEmail(email);
 
    
    if (!user) {
      throw new NotFoundError();
    }
    const isSamePassword = await compare(password, user.passwordHash);
    if (!isSamePassword) {
      throw new InvalidData();
    }
    
    return { user };
  }
}
