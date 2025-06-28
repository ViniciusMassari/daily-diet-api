import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { refresh } from './refresh';
import { authenticate } from './authenticate';
import { deleteUser } from './delete-user';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { metrics } from './metrics';
import { updateProfilePhotos } from './update-profile-photo';

export async function usersRoutes(app: FastifyInstance) {
  app.delete('/delete-profile/:id', { onRequest: [verifyJwt] }, deleteUser);
  app.post('/', createUser);
  app.patch('/token/refresh', refresh);
  app.post('/authenticate', authenticate);
  app.get('/metrics/:userId', { onRequest: verifyJwt }, metrics);
  app.patch(
    '/profile-photo/:userId',
    { onRequest: verifyJwt },
    updateProfilePhotos
  );
}
