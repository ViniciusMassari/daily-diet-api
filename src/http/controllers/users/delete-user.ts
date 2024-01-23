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


}
