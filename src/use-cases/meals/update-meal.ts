import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UseCase } from '../use-case';
import { Meal, Prisma } from '@prisma/client';
import { NotFoundError } from '../errors/NotFound';
import { NotAllowedError } from '../errors/NotAllowedError';

type Input = Prisma.MealUpdateWithoutUserInput;
type Output = Meal;
export class UpdateMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: PrismaMealsRepository) {}
  async execute(
    props: Prisma.MealUpdateWithoutUserInput,
    mealId: string,
    userId: string
  ): Promise<Meal> {
    const meal = await this.mealsRepository.getMealById(mealId);
    if (meal?.userId !== userId) {
      throw new NotAllowedError();
    }
    const updatedMeal = await this.mealsRepository.updateMeal(mealId, props);
    if (!updatedMeal) {
      throw new NotFoundError();
    }
    return updatedMeal;
  }
}
