import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-up-step-1',
  standalone: true,
  imports: [
    PasswordModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './sign-up-step-1.component.html',
  styleUrl: './sign-up-step-1.component.scss',
})
export class SignUpStep1Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  // @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }

  // public emitPreviousStep(): void {
  //   this.previousStep.emit();
  // }

  passwordForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  passwordValidator(control: any) {
    const value = control.value || '';
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumberOrSpecialChar = /[\d!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 1;
    const passwordValid = hasLetter && hasNumberOrSpecialChar && isLongEnough;
    if (!passwordValid) {
      return { passwordStrength: true };
    }
    return null;
  }

  hasLetter(): boolean {
    return /[a-zA-Z]/.test(this.passwordForm?.get('password')?.value);
  }

  hasNumberOrSpecialChar(): boolean {
    return /[\d!@#$%^&*(),.?":{}|<>]/.test(this.passwordForm?.get('password')?.value);
  }

  isLongEnough(): boolean {
    return this.passwordForm?.get('password')?.value.length >= 10;
  }

}
