import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CredentialsPaylod, LoginResponse, RegistrationResponse } from '../../models/Auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private authState$ = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authState$.asObservable();

  login(payload: CredentialsPaylod): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', payload).pipe(
      tap((response) => {
        this.setSession(response);
      }),
    );
  }

  register(payload: CredentialsPaylod): Observable<RegistrationResponse> {
    return this.http
      .post<RegistrationResponse>('auth/registration', payload)
      .pipe(tap((response) => {}));
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.authState$.next(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  private hasToken() {
    return !!localStorage.getItem('jwt_token');
  }

  private setSession(authResult: LoginResponse) {
    localStorage.setItem('jwt_token', JSON.stringify(authResult.jwtToken));
    this.authState$.next(true);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
