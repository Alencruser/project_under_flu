export interface IJWTService {
  sign(username: string): string;
  verify(username: string): string;
}
