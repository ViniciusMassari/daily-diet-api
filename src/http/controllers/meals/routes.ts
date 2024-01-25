import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { createMeal } from './create-meal';
import { updateMeal } from './update-meal';

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
  app.post('/create', createMeal);
  app.patch('/update/:id', updateMeal);
}
