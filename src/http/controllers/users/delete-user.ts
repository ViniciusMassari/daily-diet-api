import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeDeleteUserUseCase } from '@/use-cases/factories/make-delete-user-usecase';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteUser(req: FastifyRequest, rep: FastifyReply) {
  const deleteUserBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteUserBodySchema.parse(req.params);
  if (id !== req.user.sub) {
    rep.status(401).send({ message: 'You are not allowed to delete' });
  }

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();
    await deleteUserUseCase.execute({ id });
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(403).send({ message: error.message });
    }
  }
  return rep.status(200).send();
}
