import { describe, it, beforeEach, expect } from 'vitest';
import { UserRepository } from '@/repositories/user-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { hashSync } from 'bcryptjs';
import { MetricsUseCase } from './metrics';
import { NotFoundError } from '../errors/NotFound';

describe('create user unit tests', () => {
  const PASSWORD_SALT = 6;
  const mockId = '1';
  const mockUser = {
    id: mockId,
    name: 'test',
    lastname: 'test',
    email: 'test@example.com',
    bestInDietSequence: 0,
    inDietSequence: 0,
    passwordHash: hashSync('testPassword', PASSWORD_SALT),
    meals: [
      {
        id: '1',
        name: 'non-in-diet',
        description: 'Non-in-diet description',
        isInDiet: false,
        userId: mockId,
      },
      {
        id: '1',
        name: 'non-in-diet',
        description: 'Non-in-diet description',
        isInDiet: true,
        userId: mockId,
      },
    ],
  };
  let userRepository: UserRepository;
  let sut: MetricsUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new MetricsUseCase(userRepository);
  });

  it('Should return user metrics', async () => {
    const createdUser = await userRepository.createUser(mockUser);
    const { metrics } = await sut.execute({ userId: createdUser.id });
    expect(metrics).toMatchObject({
      totalRegisteredMeals: 2,
      nonInDietMeals: 1,
      inDietMeals: 1,
    });
  });
  it('Should return an error if user does not exist', async () => {
    expect(
      async () => await sut.execute({ userId: mockId })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
