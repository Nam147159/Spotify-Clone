import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignUpBarComponent } from './sign-up-bar/sign-up-bar.component';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { PlayerComponent } from './player/player.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { PlayerService } from '../services/player-service/player.service';
import { TokenService } from '../services/token-service/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  notSignupOrLogin: boolean = true;
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.playerService.init();
    this.isLoggedIn = !!this.authService.getToken();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoggedIn = !!this.authService.getToken();
        const currentRoute = this.router.url;
        this.notSignupOrLogin = !(
          currentRoute === '/sign-up' || currentRoute === '/login'
        );
      });
  }
}
