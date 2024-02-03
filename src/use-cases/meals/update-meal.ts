import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UseCase } from '../use-case';
import { Meal, Prisma } from '@prisma/client';
import { NotFoundError } from '../errors/NotFound';
import { NotAllowedError } from '../errors/NotAllowedError';
import { MealsRepository } from '@/repositories/meals-repository';

type Input = Prisma.MealUpdateWithoutUserInput;
type Output = Meal;
export class UpdateMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute(
    props: Prisma.MealUpdateWithoutUserInput,
    mealId: string
  ): Promise<Meal> {
    const meal: Meal | undefined = await this.mealsRepository.getMealById(
      mealId
    );
    if (!meal) throw new NotFoundError();
    const updatedMeal = await this.mealsRepository.updateMeal(meal.id, props);
    return updatedMeal;
  }
}
