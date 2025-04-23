import { Observable } from 'rxjs';
import { ConnectResponse, User } from '../models/user.interface';

export interface IAuthService {
  connect(data: User): Observable<ConnectResponse>;

  register(data: User): Observable<ConnectResponse>;

  storeToken(token: string): void;

  getToken(): string | null;

  storeUsername(username: string): void;

  getUsername(): string | null;

  disconnect(): void;

  refreshToken(): Observable<{ token: string }>;
}
