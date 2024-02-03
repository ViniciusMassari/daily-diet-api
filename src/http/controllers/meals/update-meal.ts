import { NotAllowedError } from '@/use-cases/errors/NotAllowedError';
import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateMeal(req: FastifyRequest, rep: FastifyReply) {
  const updateteMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const mealIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = mealIdBodySchema.parse(req.params);

  const { name, description } = updateteMealBodySchema.parse(req.body);

  try {
    const updateMealUseCase = makeUpdateMealUseCase();
    const meal = await updateMealUseCase.execute({ name, description }, id);
    if (meal.userId !== req.user.sub)
      rep.status(403).send({ message: 'Not allowed to see that info' });
    rep.status(201).send({ meal });
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(400).send({ message: error.message });
    }
    if (error instanceof NotAllowedError) {
      rep.status(403).send({ message: error.message });
    }
    rep.status(400).send({ message: 'An error ocurred, try again' });
  }
}
