import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userId');
  }

  setUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

  clearUser() {
    localStorage.removeItem('userId');
  }
}
