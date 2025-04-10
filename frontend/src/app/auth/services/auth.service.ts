import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';
import { tap } from 'rxjs';
import { IAuthService } from './auth-service.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  public tokenKey = 'auth-token';

  constructor(
    private authApiService: AuthApiService,
    private router: Router
  ) {}

  connect(data: User) {
    return this.authApiService.connect(data).pipe(
      tap((response) => {
        const token = response.jwt;
        this.storeToken(token);
        this.storeUsername(response.username);
      })
    );
  }

  register(data: User) {
    return this.authApiService.register(data).pipe(
      tap((response) => {
        const token = response.jwt;
        this.storeToken(token);
        this.storeUsername(response.username);
      })
    );
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  storeUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  disconnect() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
    this.router.navigate(['/user/connect']);
  }
}
