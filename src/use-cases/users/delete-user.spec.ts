import { describe, it, beforeEach, expect } from 'vitest';
import { UserRepository } from '@/repositories/user-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { DeleteUserUseCase } from './delete-user';
import { hash } from 'bcryptjs';
import { NotFoundError } from '../errors/NotFound';

describe('create user unit tests', () => {
  const user = {
    id: '1',
    name: 'test',
    lastname: 'test',
    email: 'test@example.com',
    bestInDietSequence: 0,
    inDietSequence: 0,
    password: 'test',
  };
  let userRepository: UserRepository;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(userRepository);
  });

  it('Should delete a user', async () => {
    const PASSWORD_SALT = 6;
    const passwordHash = await hash(user.password, PASSWORD_SALT);
    const createdUser = await userRepository.createUser({
      ...user,
      passwordHash,
    });
    await sut.execute(createdUser);
    expect(await userRepository.findById(createdUser.id)).toBeFalsy();
  });

  it('Should return an errpr if user does not exists', () => {
    expect(
      async () => await sut.execute({ id: user.id })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
