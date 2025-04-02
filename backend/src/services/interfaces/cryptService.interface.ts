export interface ICryptService {
  hashPassword(pass: string): string;
  checkPasswordMatch(pass: string, hash: string): boolean;
}
