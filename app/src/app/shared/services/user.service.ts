import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface JWTPayload {
  sub: string;
  email: string;
  jti: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5141/api/v1/users';

  constructor(private http: HttpClient) { }

  registerUser(userData: { Username: string; Email: string; Password: string; Role: string }) {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, userData);
  }

  loginUser(userData: { Email: string; Password: string }): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, userData);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  decodeJWT(): JWTPayload | null {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(window.atob(payload));
        return decodedPayload as JWTPayload;
      } catch (error) {
        console.error("Failed to decode JWT", error);
        return null;
      }
    }
    return null;
  }
}
