import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-usecase';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteMeal(req: FastifyRequest, rep: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteUserParamsSchema.parse(req.params);

  try {
    const deleteMealUseCase = makeDeleteMealUseCase();
    await deleteMealUseCase.execute({ mealId: id, userId: req.user.sub });
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(403).send({ message: error.message });
    }
  }
  return rep.status(200).send();
}
