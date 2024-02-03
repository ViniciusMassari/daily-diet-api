import { randomUUID } from 'crypto';
import { MealsRepository } from '../meals-repository';

export interface Meal {
  id?: string;
  name: string;
  description: string;
  isInDiet: boolean;
  createdAt?: Date;
  userId: string;
}

export class InMemoryMealRepository implements MealsRepository {
  items: Array<Meal> = [];
  async createMeal(props: Meal): Promise<Meal> {
    const meal = {
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      ...props,
    };
    this.items.push(meal);
    return meal;
  }
  async getMealById(id: string): Promise<Meal | undefined> {
    const filteredMeal = this.items.find((item) => item.id === id);
    return filteredMeal;
  }
  async updateMeal(mealId: string, props: Meal): Promise<Meal | undefined> {
    let meal = this.items.find((item) => item.id === mealId);
    if (!meal) return undefined;
    meal = { ...props };
    return meal;
  }
  async getAllMeals(userId: string): Promise<Meal[]> {
    const meals = this.items.filter((item) => item.userId === userId);
    return meals;
  }
  async deleteMeal(mealId: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== mealId);
    return;
  }
}
