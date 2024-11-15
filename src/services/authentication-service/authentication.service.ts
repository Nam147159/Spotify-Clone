import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {}

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, { identifier, password });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users`);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // điều hướng về trang đăng nhập
  }
}
