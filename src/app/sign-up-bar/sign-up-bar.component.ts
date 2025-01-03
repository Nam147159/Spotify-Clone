import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-bar',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-bar.component.html',
  styleUrl: './sign-up-bar.component.scss'
})
export class SignUpBarComponent {

  constructor(private router: Router) { }

  onClick() {
    this.router.navigate(['/sign-up']);
  }
}
