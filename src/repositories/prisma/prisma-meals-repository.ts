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
  ): Promise<Meal> {
    return await prisma.meal.update({
      where: { id: mealId },
      data: { ...props },
    });
  }
  async getAllMeals(userId: string): Promise<Meal[] | null> {
    return await prisma.meal.findMany({ where: { userId } });
  }

  async deleteMeal(mealId: string): Promise<void> {
    await prisma.meal.delete({ where: { id: mealId } });
  }

  async metrics(userId: string) {
    const notInDietMeals = await prisma.meal
      .findMany({
        where: { userId, isInDiet: false },
      })
      .then((meals) => meals.length);
    const inDietMeals = await prisma.meal
      .findMany({
        where: { userId, isInDiet: true },
      })
      .then((meals) => meals.length);
    const bestInDietSequence = await prisma.meal
      .findFirst({
        where: { id: userId },
        include: { User: true },
      })
      .then((meal) => {
        meal?.User?.bestInDietSequence;
      });

    const totalOfRegisteredMeals = await prisma.meal
      .findMany({
        where: { userId },
      })
      .then((meals) => meals.length);

    return {
      bestInDietSequence,
      inDietMeals,
      notInDietMeals,
      totalOfRegisteredMeals,
    };
  }
}
