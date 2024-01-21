import { InvalidData } from '@/use-cases/errors/InvalidData';
import { makeRegisterUserUsecase } from '@/use-cases/factories/make-register-user-usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = registerBodySchema.parse(req.body);
  try {
    const registerUserUseCase = makeRegisterUserUsecase();
    const { user } = await registerUserUseCase.execute({ email, password });
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
