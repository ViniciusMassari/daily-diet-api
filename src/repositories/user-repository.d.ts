interface User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}
export interface UserRepository<Input> {
  createUser(props: Input): Promise<Output>;
  findById(id: string): Promise<Input | null>;
  updateUser(id: string, props: Partial<Input>): Promise<Output>;
  deleteUser(id: string): Promise<void>;
  findByEmail(email: string): Promise<Output | null>;
}
