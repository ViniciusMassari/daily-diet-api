import { UserRepository } from '@/repositories/user-repository';
import { UseCase } from '../use-case';
import { User } from '@prisma/client';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotAllowedError } from '../errors/NotAllowedError';

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
  constructor(private mealsRepository: MealsRepository) {}
  async execute({ userId, loggedUser }: Input): Promise<Output> {
    if (userId !== loggedUser) {
      throw new NotAllowedError();
    }

    const metrics: Metrics = await this.mealsRepository.metrics(userId);

    return { metrics };
  }
}
