import { NotAllowedError } from '@/use-cases/errors/NotAllowedError';
import { NotFoundError } from '@/use-cases/errors/NotFound';
import { makeMetricsUseCase } from '@/use-cases/factories/make-metrics-usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function metrics(req: FastifyRequest, rep: FastifyReply) {
  const metricsParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = metricsParamsSchema.parse(req.params);
  if (userId !== req.user.sub) {
    rep.status(403).send({ message: 'Not allowed to see that info' });
  }
  try {
    const metricsUseCase = makeMetricsUseCase();
    const metrics = await metricsUseCase.execute({
      userId,
    });
    rep.status(200).send(metrics);
  } catch (error) {
    if (error instanceof NotFoundError) {
      rep.status(404).send({ message: error.message });
    }
  }
}
