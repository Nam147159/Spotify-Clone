import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm: FormGroup;
  // identifier: string = '';
  // password: string = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthenticationService) { 
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { identifier, password } = this.loginForm.value;

      console.log(identifier + ' ' + password);

      this.authService.login(identifier, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log(response);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => {
          console.log('Login complete');
        }
      });
    }
    
  }

}
