import { NotAllowedError } from '@/use-cases/errors/NotAllowedError';
import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeGetAllMealsUseCase } from '@/use-cases/factories/make-get-all-meals-usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getAllMeals(req: FastifyRequest, rep: FastifyReply) {
  const getAllMealsParamsSchema = z.object({
    userId: z.string().uuid(),
  });
  const { userId } = getAllMealsParamsSchema.parse(req.params);
  if (userId !== req.user.sub) {
    rep.status(403).send({ message: 'You are not allowed to see that info' });
  }
  try {
    const getAllMealsUseCase = makeGetAllMealsUseCase();
    const meals = await getAllMealsUseCase.execute({
      userId,
    });
    rep.status(200).send({ meals });
  } catch (error) {
    if (error instanceof NotFoundError) {
      await rep.status(404).send();
    }
    if (error instanceof NotAllowedError) {
      await rep.status(403).send();
    }
  }
}
