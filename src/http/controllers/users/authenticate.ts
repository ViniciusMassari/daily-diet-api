import { InvalidData } from '@/use-cases/errors/InvalidData';
import { makeAuthenticateUserUsecase } from '@/use-cases/factories/make-authenticate-user-usecase';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);
  try {
    const authenticateUserUseCase = makeAuthenticateUserUsecase();
    const { user } = await authenticateUserUseCase.execute({ email, password });
    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    );

    rep
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({
        token,
      });
  } catch (error) {
    if (error instanceof InvalidData) {
      rep.status(403).send({ message: error.message });
    }
  }
}
