export class NotAllowedError extends Error {
  constructor() {
    super('You are not allowed to see that info');
  }
}
