export interface UseCase<Input, Output> {
  execute(props: Input): Promise<Output> | Output;
}
