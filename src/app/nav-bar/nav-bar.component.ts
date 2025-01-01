import {
  debounce,
  debounceTime,
  distinct,
  from,
  fromEvent,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';
import { AuthenticationService } from './../../services/authentication-service/authentication.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;
  searchText$: Subject<string> = new Subject<string>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      },
    );
    this.searchText$.pipe(throttleTime(400, undefined, {
      leading: true,
      trailing: true,
    })).subscribe((query) => {
      console.log('Search query:', query);
      if (!query) {
        this.router.navigate(['search']);
      } else {
        this.router.navigate(['search', query]);
      }
    });
  }

  resetSearchInput(): void {
    this.searchInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.resetSearchInput();
  }

  logout(): void {
    this.authService.logout();
    // Additional logout logic if needed (e.g., navigation)
    this.resetSearchInput();
  }

  navigateHome() {
    this.router.navigate(['/']);
    this.resetSearchInput();
  }

  handleSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchText$.next(query);
  }
}
