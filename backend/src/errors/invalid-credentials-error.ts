import { AuthError } from './auth-error';

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid credentials provided.', 401);
  }
}
