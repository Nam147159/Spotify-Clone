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

  ngOnInit(): void {
    // Kiểm tra nếu token có trong localStorage để xác định trạng thái đăng nhập
    this.isLoggedIn = !!localStorage.getItem('token');
  }
}
