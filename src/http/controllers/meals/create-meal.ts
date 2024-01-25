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
    rep.status(201).send({ meal });
  } catch (error) {
    rep.status(400).send({ message: 'An error ocurred, try again' });
  }
}
