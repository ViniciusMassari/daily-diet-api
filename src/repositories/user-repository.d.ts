export interface UserRepository<Input, Output> {
  createUser(props: Input): Promise<Output>;
  findById(id: string): Promise<Output | null>;
  updateUser(id: string, props: Partial<Input>): Promise<Output>;
  deleteUser(id: string): Promise<User>;
  findByEmail(email: string): Promise<Output | null>;
}
