import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createMeal(req: FastifyRequest, rep: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isInDiet: z.boolean(),
  });

  const { name, isInDiet, description } = createMealBodySchema.parse(req.body);

  try {
    const createMealUseCase = makeCreateMealUseCase();
    const meal = await createMealUseCase.execute({
      name,
      description,
      isInDiet,
      userId: req.user.sub,
    });
    rep.status(201).send(meal);
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(403).send({ message: error.message });
    }
    rep.status(400).send({ message: 'An error ocurred, try again' });
  }
}
