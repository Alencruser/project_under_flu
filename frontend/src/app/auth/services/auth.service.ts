import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthApiService } from './auth-api.service';
import { IAuthService } from './auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  public tokenKey = 'auth-token';
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

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
        this.startTokenRefreshCycle();
      })
    );
  }

  register(data: User) {
    return this.authApiService.register(data).pipe(
      tap((response) => {
        const token = response.jwt;
        this.storeToken(token);
        this.storeUsername(response.username);
        this.startTokenRefreshCycle();
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
    this.stopTokenRefreshCycle();
    this.router.navigate(['/user/connect']);
  }

  refreshToken() {
    return this.authApiService.refreshToken(this.getToken()).pipe(
      tap((response) => {
        const token = response.token;
        this.storeToken(token);
      })
    );
  }

  startTokenRefreshCycle(): void {
    const fiftyMins = 50 * 60 * 1000;

    this.refreshInterval = setInterval(() => {
      this.refreshToken().subscribe({
        next: () => console.log('Token refreshed successfully'),
        error: (err) => {
          this.stopTokenRefreshCycle();
          console.error('Token refresh failed', err);
        },
      });
    }, fiftyMins);
  }

  stopTokenRefreshCycle(): void {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  }
}
