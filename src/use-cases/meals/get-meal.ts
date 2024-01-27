import { Meal } from '@prisma/client';
import { UseCase } from '../use-case';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from '../errors/NotFound';
import { NotAllowedError } from '../errors/NotAllowedError';

interface Input {
  id: string;
  userId: string;
}
type Output = Meal;

export class GetMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute(props: Input): Promise<Meal> {
    const { userId, id } = props;
    const meal: Meal | null = await this.mealsRepository.getMealById(id);
    if (!meal) {
      throw new NotFoundError(
        'Could not find a meal with the given information'
      );
    }
    if (meal.userId !== userId) {
      throw new NotAllowedError();
    }
    return meal;
  }
}
