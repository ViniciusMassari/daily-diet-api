import { UserRepository } from '@/repositories/user-repository';
import { UseCase } from '../use-case';
import { User } from '@prisma/client';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotAllowedError } from '../errors/NotAllowedError';
import { NotFoundError } from '../errors/NotFound';

interface Metrics {
  bestInDietSequence: number;
  inDietMeals: number;
  notInDietMeals: number;
  totalOfRegisteredMeals: number;
}
interface Input {
  userId: string;
  loggedUser: string;
}

interface Output {
  metrics: Metrics;
}

export class MetricsUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: UserRepository) {}
  async execute({ userId, loggedUser }: Input): Promise<Output> {
    if (userId !== loggedUser) throw new NotAllowedError();

    const metrics: Metrics = await this.usersRepository.metrics(userId);

    if (!metrics) throw new NotFoundError();

    return { metrics };
  }
}
