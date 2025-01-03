import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../services/authentication-service/authentication.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy{

  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    // Additional logout logic if needed (e.g., navigation)
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  showSearchPanel() {
    this.router.navigate(['/search']);
  }

  showProfile() {
    this.router.navigate(['/me']);
  }
  
}
