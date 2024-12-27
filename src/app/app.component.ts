import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { SignUpBarComponent } from "./sign-up-bar/sign-up-bar.component";
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { PlayerComponent } from "./player/player.component";
import { Router } from '@angular/router';
import { filter } from 'rxjs';
=======
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { SignUpBarComponent } from "./sign-up-bar/sign-up-bar.component";
>>>>>>> profile-settings

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SignUpBarComponent, PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

<<<<<<< HEAD
export class AppComponent implements OnInit {
  notSignupOrLogin: boolean = true;
  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoggedIn = !!this.authService.getToken();
      const currentRoute = this.router.url;
      this.notSignupOrLogin = !(currentRoute === '/sign-up' || currentRoute === '/login');
    });
  }
=======
export class AppComponent {
>>>>>>> profile-settings
}
