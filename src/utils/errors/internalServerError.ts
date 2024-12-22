export class InternalServerError extends Error {
  constructor(message: string = 'An unexpected error occurred.') {
    super(message);
    this.name = 'InternalServerError';
  }
}
