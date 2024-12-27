import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private isBrowser: boolean;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) platformId: Object, private storageService: StorageService) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.checkAuthStatus();
      // Thêm event listener cho việc đóng tab
      window.addEventListener('beforeunload', this.handleTabClose.bind(this));
    }
  }

  ngOnDestroy() {
    // Xóa event listener khi service bị destroy
    if (this.isBrowser) {
      window.removeEventListener('beforeunload', this.handleTabClose.bind(this));
    }
  }

  private handleTabClose() {
    this.logout();
  }

  private checkAuthStatus(): void {
    // Sử dụng sessionStorage thay vì localStorage
    if (this.isBrowser) {
      const token = this.storageService.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, { identifier, password });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users`);
  }

  logout() {
    if (this.isBrowser) {
      sessionStorage.removeItem('token'); // điều hướng về trang đăng nhập
      this.isAuthenticatedSubject.next(false);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return this.storageService.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      this.storageService.setItem('token', token);
      this.isAuthenticatedSubject.next(true);
    }
  }
}
