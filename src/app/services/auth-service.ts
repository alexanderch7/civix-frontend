import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthService {
  private url = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  constructor() {}
  login(credenciales: { correo: string; password: string }):Observable<any> {
    return this.httpClient
      .post(environment.apiUrl + '/auth/login', credenciales, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const token = response.body?.jwt || response.headers.get('Authorization');

          if (token) {

            const limpiarToken = token.startsWith('Bearer ') ? token.substring(7) : token;
            localStorage.setItem('token', limpiarToken);
          }
        }),
      );
  }
  logout(): void {
    localStorage.removeItem('token');
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
