import { DatabaseService } from './../../services/database-service/database.service';
import { Component, OnInit } from '@angular/core';
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
import { StorageService } from '../../services/storage-service/storage.service';

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
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // identifier: string = '';
  // password: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private storageService: StorageService) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Kiểm tra nếu đã đăng nhập thì chuyển hướng
    if (this.authService.getToken()) {
      this.router.navigate(['']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { identifier, password } = this.loginForm.value;

      console.log(identifier + ' ' + password);

      this.authService.login(identifier, password).subscribe({
        next: (response) => {
          this.storageService.setItem('token', response.token);
          // sessionStorage.setItem('token', response.token);
          this.storageService.setItem('identifier', identifier);
          // sessionStorage.setItem('identifier', identifier);
          this.authService['isAuthenticatedSubject'].next(true);
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
