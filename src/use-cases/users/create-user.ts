import { Prisma, User } from '@prisma/client';
import { UseCase } from '../use-case';
import { hash } from 'bcryptjs';
import { UserRepository } from '@/repositories/user-repository';
import { UserAlreadyExists } from '../errors/UserAlreadyExist';

type Input = {
  email: string;
  name: string;
  lastname: string;
  password: string;
};

type Output = User;

export class CreateUserUseCase implements UseCase<Input, User> {
  constructor(
    private userRepository: UserRepository<Prisma.UserCreateInput, User>
  ) {}
  async execute(props: Input): Promise<Output> {
    const { email, name, lastname, password } = props;
    const doesUserExist = await this.userRepository.findByEmail(email);

    if (doesUserExist) {
      throw new UserAlreadyExists();
    }

    const PASSWORD_SALT = 6;
    const passwordHash = await hash(password, PASSWORD_SALT);
    const user = await this.userRepository.createUser({
      email,
      lastname,
      name,
      passwordHash,
    });

    return user;
  }
}
