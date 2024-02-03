import { NotAllowedError } from '@/use-cases/errors/NotAllowedError';
import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-usecase';
import { Meal } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getMeal(req: FastifyRequest, rep: FastifyReply) {
  const getMealBodySchema = z.object({
    id: z.string().uuid(),
  });
  const { id } = getMealBodySchema.parse(req.params);
  try {
    const getMealUseCase = makeGetMealUseCase();
    const meal: Meal | undefined = await getMealUseCase.execute({
      mealId: id,
    });
    if (meal && meal.userId !== req.user.sub)
      rep.status(403).send({ message: 'Not allowed to access that info' });
    rep.status(200).send({ meal });
  } catch (error) {
    if (error instanceof NotAllowedError) {
      rep.status(401).send({ message: error.message });
    }
    if (error instanceof NotFoundError) {
      rep.status(404).send({ message: error.message });
    }
  }
}
