import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
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

interface Month {
  name: string;
  value: number;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
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
    CheckboxModule,
  ],
  templateUrl: './sign-up-main.component.html',
  styleUrls: ['./sign-up-main.component.scss'],
})
export class SignUpMainComponent implements OnInit {
  signupForm: FormGroup;
  currentStep = 1;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
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

  months: Month[] | undefined;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(10)]],

      username: ['', Validators.required],

      day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],

      month: ['', Validators.required],

      year: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(2100)],
      ],

      gender: ['', Validators.required],

      ad: [false, Validators.requiredTrue],

      share: [false, Validators.requiredTrue],
    });

    this.months = [
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
      { name: 'December', value: 12 },
    ];

    this.form = new FormGroup({
      selectedMonth: new FormControl<Month | null>(null),
    });
  }

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
    return this.signupForm.get('username');
  }
}
