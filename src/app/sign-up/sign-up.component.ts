import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    PasswordModule,
    CalendarModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    MessageModule,
    CommonModule,
    FormsModule,
    DividerModule,
    ProgressBarModule,
    ToastModule,
    CheckboxModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  currentStep = 1;
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      ad: [false, Validators.requiredTrue],
      share: [false],
    });
  }

  passwordValidator(control: any) {
    const value = control.value || '';
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumberOrSpecialChar = /[\d!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 10;
    const passwordValid = hasLetter && hasNumberOrSpecialChar && isLongEnough;
    if (!passwordValid) {
      return { passwordStrength: true };
    }
    return null;
  }
  hasLetter(): boolean {
    return /[a-zA-Z]/.test(this.passwordField?.value);
  }

  hasNumberOrSpecialChar(): boolean {
    return /[\d!@#$%^&*(),.?":{}|<>]/.test(this.passwordField?.value);
  }

  isLongEnough(): boolean {
    return this.passwordField?.value?.length >= 10;
  }

  ngOnInit(): void {}
  
  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  submitForm() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      alert('Form Submitted');
      // Gửi dữ liệu đăng ký đến API hoặc xử lý logic ở đây
    }
  }

  get emailField() {
    return this.signupForm.get('email');
  }

  get passwordField() {
    return this.signupForm.get('password');
  }

  get nameField() {
    return this.signupForm.get('name');
  }
}
