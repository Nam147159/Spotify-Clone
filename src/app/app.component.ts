import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { SignUpBarComponent } from "./sign-up-bar/sign-up-bar.component";
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SignUpBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken(); // Sử dụng hàm getToken để kiểm tra
  }
}
