import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthHttpClientService } from './auth-http-client-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpClientService implements IAuthHttpClientService {
  constructor(private http: HttpClient) {}

  private withAuthHeaders(headers?: HttpHeaders): HttpHeaders {
    const authHeader = new HttpHeaders({ 'X-Requires-Auth': 'true' });
    return headers ? headers.set('X-Requires-Auth', 'true') : authHeader;
  }

  get<T>(
    url: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http.get<T>(url, {
      ...options,
      headers: this.withAuthHeaders(options.headers),
    });
  }

  post<T>(
    url: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http.post<T>(url, body, {
      ...options,
      headers: this.withAuthHeaders(options.headers),
    });
  }

  put<T>(
    url: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    options.headers = this.withAuthHeaders(options.headers);
    return this.http.put<T>(url, body, options);
  }

  delete<T>(
    url: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    options.headers = this.withAuthHeaders(options.headers);
    return this.http.delete<T>(url, options);
  }
}
