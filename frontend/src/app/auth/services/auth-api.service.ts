import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectResponse, User } from '../models/user.interface';
import { IAuthApiService } from './auth-api-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements IAuthApiService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  connect(data: User) {
    return this.http.post<ConnectResponse>(`${this.apiUrl}/connect`, data);
  }

  register(data: User) {
    return this.http.post<ConnectResponse>(`${this.apiUrl}/register`, data);
  }
}
