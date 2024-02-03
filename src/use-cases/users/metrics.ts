import { UserRepository } from '@/repositories/user-repository';
import { UseCase } from '../use-case';
import { NotFoundError } from '../errors/NotFound';

interface Metrics {
  bestInDietSequence: number;
  inDietMeals: number;
  notInDietMeals: number;
  totalOfRegisteredMeals: number;
}
interface Input {
  userId: string;
}

interface Output {
  metrics: Metrics;
}

export class MetricsUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: UserRepository) {}
  async execute({ userId }: Input): Promise<Output> {
    const metrics: Metrics = await this.usersRepository.metrics(userId);

    if (!metrics) throw new NotFoundError();

    return { metrics };
  }
}
