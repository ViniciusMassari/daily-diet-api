import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateMeal(req: FastifyRequest, rep: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const mealIdBodySchema = z.object({
    id: z.string(),
  });

  const { id } = mealIdBodySchema.parse(req.params);

  const { name, description } = createMealBodySchema.parse(req.body);

  try {
    const createMealUseCase = makeUpdateMealUseCase();
    const meal = await createMealUseCase.execute({ name, description }, id);
    rep.status(201).send({ meal });
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(400).send({ message: error.message });
    }
    rep.status(400).send({ message: 'An error ocurred, try again' });
  }
}
