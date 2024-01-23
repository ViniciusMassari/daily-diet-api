class NotFoundError extends Error {
  constructor() {
    super('data was not found');
  }
}
