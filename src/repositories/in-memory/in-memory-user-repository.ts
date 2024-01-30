import { randomUUID } from 'crypto';
import { UserRepository } from '../user-repository';

interface User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  passwordHash: string;
  inDietSequence: number;
  bestInDietSequence: number;
  createdAt?: Date;
}

export class InMemoryUserRepository implements UserRepository {
  items: Array<User> = [];
  async createUser(props: User): Promise<void> {
    const user = {
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      ...props,
    };
    this.items.push(user);
    return;
  }
  async findById(id: string): Promise<User | undefined> {
    const filteredUser = this.items.find((item) => item.id === id);
    return filteredUser;
  }
  async deleteUser(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
    return;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.items.find((item) => item.email === email);
    return user;
  }
  async updateUserInDietSequence(
    userId: string,
    isInDiet: boolean
  ): Promise<User | undefined> {
    const user = this.items.find((item) => item.id === userId);
    if (!user) {
      return undefined;
    }
    if (!isInDiet) {
      user.inDietSequence = 0;
    }
    user.inDietSequence = user.bestInDietSequence++;
    return user;
  }
}
