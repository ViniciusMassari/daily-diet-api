import { UserAlreadyExists } from '@/use-cases/errors/UserAlreadyExist';
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-usecase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';



const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  lastname: z.string(),
  password: z
    .string()
    .min(8, 'Password must have a minimum length of 8 characters'),
});

export async function createUser(req: FastifyRequest, rep: FastifyReply) {
  const { email, lastname, name, password } = createUserBodySchema.parse(
    req.body
  );


  try {
    const createUserCase = makeCreateUserUseCase();
    const user = await createUserCase.execute({
      name,
      lastname,
      email,
      password,
    });

    rep.status(201).send({ user });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      rep.status(400).send({
        error: error.message,
      });
    }
  }
}
