import { Meal } from '@prisma/client';
import { UseCase } from '../use-case';
import { MealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from '../errors/NotFound';
import { NotAllowedError } from '../errors/NotAllowedError';

interface Input {
  userId: string;
  loggedUserId: string;
}
type Output = Meal[];

export class GetAllMealsUseCase implements UseCase<Input, Output> {
  constructor(private mealsRepository: MealsRepository) {}
  async execute(props: Input): Promise<Meal[]> {
    const { userId, loggedUserId } = props;
    const meals: Meal[] | null = await this.mealsRepository.getAllMeals(userId);

    if (!meals) {
      throw new NotFoundError(
        'Could not find a meal with the given information'
      );
    }
    if (userId !== loggedUserId) {
      throw new NotAllowedError();
    }
    return meals;
  }
}
