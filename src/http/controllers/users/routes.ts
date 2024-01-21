import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { refresh } from './refresh';
import { authenticate } from './authenticate';

export async function usersRoutes(app: FastifyInstance) {
  app.patch('/token/refresh', refresh);
  app.post('/register', authenticate);
  app.post('/user', createUser);
}
