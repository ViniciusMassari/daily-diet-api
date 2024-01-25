import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UseCase } from '../use-case';
import { Meal, Prisma } from '@prisma/client';

type Input = Prisma.MealUpdateWithoutUserInput;
type Output = Meal;
export class UpdateMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: PrismaMealsRepository) {}
  async execute(
    props: Prisma.MealUpdateWithoutUserInput,
    mealId: string
  ): Promise<Meal> {
    const updatedMeal = await this.mealsRepository.updateMeal(mealId, props);
    if (!updatedMeal) {
      throw new NotFoundError();
    }
    return updatedMeal;
  }
}
