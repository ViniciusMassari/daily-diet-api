import { Meal, User } from '@prisma/client';
import { UseCase } from '../use-case';
import { MealsRepository } from '@/repositories/meals-repository';
import { UserRepository } from '@/repositories/user-repository';

interface Input {
  name: string;
  description: string;
  isInDiet: boolean;
  userId: string;
}
interface Output {
  meal: Meal;
  updatedUser: User;
}
export class CreateMealUseCase implements UseCase<Input, Output> {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UserRepository
  ) {}
  async execute(props: Input): Promise<Output> {
    const { name, isInDiet, description, userId } = props;
    const updatedUser: User =
      await this.usersRepository.updateUserInDietSequence(userId, isInDiet);

    const meal = await this.mealsRepository.createMeal({
      name,
      isInDiet,
      description,
      userId,
    });
    return { meal, updatedUser };
  }
}
