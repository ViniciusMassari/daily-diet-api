export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Data was not found');
  }
}
