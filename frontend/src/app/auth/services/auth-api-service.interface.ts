import { Observable } from 'rxjs';
import { ConnectResponse, User } from '../models/user.interface';

export interface IAuthApiService {
  connect(data: User): Observable<ConnectResponse>;

  register(data: User): Observable<ConnectResponse>;

  refreshToken(token: string | null): Observable<{ token: string }>;
}
