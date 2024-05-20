import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '@/lib/prisma';
import { NotFoundError } from '@/use-cases/errors/NotFound';

export interface Metrics {
  inDietMeals: number;
  nonInDietMeals: number;
  totalRegisteredMeals: number;
}


export class PrismaUserRepository implements UserRepository {

  async createUser(props: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data: { ...props } });
    
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundError('User was not found');
    }
    return user;
  }

  async updateUserInDietSequence(id: string, isInDiet: boolean): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundError('User was not found');

    if (isInDiet === false) {
      await this.saveBestInDietSequence(user);
      return await this.findById(user.id);
    }
    if (user.inDietSequence !== null) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          inDietSequence: user.inDietSequence + 1,
        },
      });
    }

    return await this.findById(user.id);
  }

  async saveBestInDietSequence(user: User): Promise<void> {
    if (
      user.inDietSequence !== null &&
      user.bestInDietSequence !== null &&
      user.inDietSequence > user.bestInDietSequence
    ) {
      await prisma.user.update({
        where: { id: user.id },
        data: { bestInDietSequence: user.inDietSequence, inDietSequence: 0 },
      });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { bestInDietSequence: user.inDietSequence, inDietSequence: 0 },
    });
    return;
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
    return;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    
    return user;
  }

  async metrics(userId: string): Promise<Metrics | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { meals: true },
    });
    if (!user) return null;
    const inDietMeals = user?.meals.filter(
      (meal) => meal.isInDiet === true
    ).length;
    const nonInDietMeals = user?.meals.filter(
      (meal) => meal.isInDiet === false
    ).length;
    const totalRegisteredMeals = user?.meals.length;

    return { inDietMeals, nonInDietMeals, totalRegisteredMeals };
  }

    async updateProfilePhoto(imageBuffer: Buffer ,userId:string) {
    const {id} = await prisma.user.update({
      where:{
        id: userId,
      },
      data:{
        profilePicture: imageBuffer
      }
    })


  return id ;

  }
}
