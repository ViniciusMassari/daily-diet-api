import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { createMeal } from './create-meal';
import { updateMeal } from './update-meal';
import { getMeal } from './get-meal';
import { getAllMeals } from './get-all-meals';
import { deleteMeal } from './delete-meal';

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
  app.post('/create', createMeal);
  app.patch('/update/:id', updateMeal);
  app.get('/:id', getMeal);
  app.get('/all-meals/:userId', getAllMeals);
  app.delete('/delete-meal/:id', deleteMeal);
}
