export interface UserRepository {
  createUser(props: Input): Promise<Output>;
  findById(id: string): Promise<Input | null>;
  deleteUser(id: string): Promise<void>;
  findByEmail(email: string): Promise<Output | null>;
  updateUserInDietSequence(userId: string, isInDiet: boolean): Promise<Output>;
  metrics(userId: string): Promise<Output | null>;
}
