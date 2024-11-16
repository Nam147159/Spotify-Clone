import { AuthenticationService } from './../../services/authentication-service/authentication.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor (private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.isLoggedIn = true;
        } else {
            sessionStorage.removeItem('token'); // Xóa token không hợp lệ
            this.isLoggedIn = false;
        }
    }
}
  
}
