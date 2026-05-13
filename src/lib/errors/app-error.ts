export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status = 500,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
