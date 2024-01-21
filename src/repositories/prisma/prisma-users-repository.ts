import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository
  implements UserRepository<Prisma.UserCreateInput, User>
{
  async createUser(props: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data: { ...props } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirstOrThrow({ where: { id } });
    return user;
  }

  async updateUser(
    id: string,
    props: Partial<Prisma.UserCreateInput>
  ): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: props,
    });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
}
