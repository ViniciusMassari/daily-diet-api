import fastify, { FastifyError } from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import { usersRoutes } from '@/http/controllers/users/routes';
import { mealsRoutes } from './http/controllers/meals/routes';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import metricsPlugins from 'fastify-metrics';

export const app = fastify({
  logger: true,
});

app.register(fastifyCookie);
app.register(multipart);
app.register(usersRoutes, {
  prefix: '/user',
});

app.register(mealsRoutes, {
  prefix: '/meal',
});

app.register(metricsPlugins, { endpoint: '/metrics' });

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.get('/ping', () => {
  return 'pong';
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return reply
      .status(400)
      .send({ message: error.message, target: error.meta ?? '' });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
