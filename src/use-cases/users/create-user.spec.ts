import { describe, it, beforeEach, beforeAll, expect } from 'vitest';
import { CreateUserUseCase } from './create-user';
import { UserRepository } from '@/repositories/user-repository';
import {
  InMemoryUserRepository,
  User,
} from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExists } from '../errors/UserAlreadyExist';

describe('create user unit tests', () => {
  const user = {
    name: 'test',
    lastname: 'test',
    email: 'test@example.com',
    bestInDietSequence: 0,
    inDietSequence: 0,
    password: 'test',
  };
  let userRepository: UserRepository;
  let sut: CreateUserUseCase;
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it.only('Should return an Error if user already exists', async () => {
    await sut.execute(user);
    expect(async () => await sut.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExists
    );
  });

  it('Should return a user', async () => {
    const createdUser = await sut.execute(user);
    expect(createdUser).toBeDefined();
  });
});
