import { Meal } from '@prisma/client';
import { UseCase } from '../use-case';
import { NotFoundError } from '../errors/NotFound';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotAllowedError } from '../errors/NotAllowedError';

interface Input {
  mealId: string;
  userId: string;
}

type Output = void;

export class DeleteMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute({ mealId, userId }: Input): Promise<void> {
    const meal: Meal = await this.mealsRepository.getMealById(mealId);
    if (meal.userId !== userId) {
      throw new NotAllowedError();
    }
    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.id) await this.mealsRepository.deleteMeal(meal.id);
    return;
  }
}
