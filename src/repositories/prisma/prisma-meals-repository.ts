import { Meal, Prisma } from '@prisma/client';
import { MealsRepository } from '../meals-repository';
import { prisma } from '@/lib/prisma';

export class PrismaMealsRepository implements MealsRepository {
  async createMeal(props: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    return await prisma.meal.create({ data: props });
  }

  async getMealById(id: string): Promise<Meal | null> {
    return await prisma.meal.findFirst({
      where: {
        id,
      },
    });
  }
  async updateMeal(
    mealId: string,
    props: Prisma.MealUpdateInput
  ): Promise<Meal | null> {
    return await prisma.meal.update({
      where: { id: mealId },
      data: { ...props },
    });
  }
  async getAllMeals(userId: string): Promise<Meal[] | null> {
    return await prisma.meal.findMany({ where: { userId } });
  }
}
