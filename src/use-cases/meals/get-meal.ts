import { Meal } from '@prisma/client';
import { UseCase } from '../use-case';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from '../errors/NotFound';
import { NotAllowedError } from '../errors/NotAllowedError';

interface Input {
  mealId: string;
}
type Output = Meal | undefined;

export class GetMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute(props: Input): Promise<Meal | undefined> {
    const { mealId } = props;
    const meal: Meal | null = await this.mealsRepository.getMealById(mealId);
    if (!meal) {
      return undefined;
    }

    return meal;
  }
}
