export interface IJWTService {
  sign(username: string): string;
  verify(username: string): string;
  refreshToken(username: string, tokenReceived: string): string;
}
