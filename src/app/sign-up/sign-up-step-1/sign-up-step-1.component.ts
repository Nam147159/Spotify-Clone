import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-sign-up-step-1',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-up-step-1.component.html',
  styleUrl: './sign-up-step-1.component.scss'
})
export class SignUpStep1Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }

  public emitPreviousStep(): void {
    this.previousStep.emit();
  }

  passwordForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      password: new FormControl('', Validators.required),
    });

  }

  hasLetter(): boolean {
    return /[a-zA-Z]/.test(this.passwordForm?.value);
  }

  hasNumberOrSpecialChar(): boolean {
    return /[\d!@#$%^&*(),.?":{}|<>]/.test(this.passwordForm?.value);
  }

  isLongEnough(): boolean {
    return this.passwordForm?.value?.length >= 10;
  }

}
