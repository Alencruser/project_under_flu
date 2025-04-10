import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requiresAuth = req.headers.get('x-requires-auth') === 'true';
    const token = localStorage.getItem('auth-token');

    if (requiresAuth && !token) {
      this.router.navigate(['/user/connect']);
      return throwError(() => new Error('Authentication required'));
    }

    let modifiedReq = req;

    if (requiresAuth && token) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      });
    }

    return next.handle(modifiedReq);
  }
}
