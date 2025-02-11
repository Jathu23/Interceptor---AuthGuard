import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginRequest {
  emailOrNic: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
    isMaster?: boolean;
  };
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7261/api/Login';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.data.token);
         
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
   
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
