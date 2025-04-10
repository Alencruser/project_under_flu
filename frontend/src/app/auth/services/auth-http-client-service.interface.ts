import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IAuthHttpClientService {
  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
    }
  ): Observable<T>;

  post<T>(
    url: string,
    body: any,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
    }
  ): Observable<T>;

  put<T>(
    url: string,
    body: any,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
    }
  ): Observable<T>;

  delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
    }
  ): Observable<T>;
}
