import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/auth`;

  constructor(
    private readonly http: HttpClient
  ) {}

  login(payload: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, payload, { withCredentials: true });
  }

  signup(payload: any) {
    return this.http.post(`${this.baseUrl}/signup`, payload, { withCredentials: true });
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`, { withCredentials: true });
  }

  isAuthenticated(): Observable<boolean> {
    const userInLocalStorage = !!localStorage.getItem('userId');
    if(!userInLocalStorage) {
      return of(false);
    }

    return new Observable<boolean> ((observer) => {
      this.http.get(`${this.baseUrl}/check`, { withCredentials: true }).subscribe({
      next: (res:any) => {
          if(res?.status) {
            observer.next(true);
            observer.complete();
          }
          else {
            observer.next(false);
            observer.complete();
          }
        },
        error: (_err) => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  setUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

  clearUser() {
    localStorage.removeItem('userId');
  }
}
