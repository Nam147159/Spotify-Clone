import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
    
    // Thêm event listener cho việc đóng tab
    window.addEventListener('beforeunload', this.handleTabClose.bind(this));
  }

  ngOnDestroy() {
    // Xóa event listener khi service bị destroy
    window.removeEventListener('beforeunload', this.handleTabClose.bind(this));
  }

  private handleTabClose() {
    this.logout();
  }

  private checkAuthStatus(): void {
    // Sử dụng sessionStorage thay vì localStorage
    const token = sessionStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }

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

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
