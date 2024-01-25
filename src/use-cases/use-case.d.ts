export interface UseCase<Input, Output> {
  execute(props: Input, ...props): Promise<Output> | Output;
}
