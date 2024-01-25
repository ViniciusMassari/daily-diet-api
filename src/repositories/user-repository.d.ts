export interface UserRepository<Input, Output> {
  createUser(props: Input): Promise<Output>;
  findById(id: string): Promise<Input | null>;
  deleteUser(id: string): Promise<void>;
  findByEmail(email: string): Promise<Output | null>;
}
