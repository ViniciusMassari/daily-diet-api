import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { refresh } from './refresh';
import { register } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.patch('/token/refresh', refresh);
  app.post('/register', register);
  app.post('/user', createUser);
}
