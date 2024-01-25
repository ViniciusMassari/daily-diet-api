import { Meal, Prisma } from '@prisma/client';
import { UseCase } from '../use-case';
import { MealsRepository } from '@/repositories/meals-repository';

interface Input {
  name: string;
  description: string;
  isInDiet: boolean;
  userId: string;
}
type Output = Meal;
export class CreateMealUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute(props: Input): Promise<Output> {
    const { name, isInDiet, description, userId } = props;
    const meal = await this.mealsRepository.createMeal({
      name,
      isInDiet,
      description,
      userId,
    });
    return meal;
  }
}
