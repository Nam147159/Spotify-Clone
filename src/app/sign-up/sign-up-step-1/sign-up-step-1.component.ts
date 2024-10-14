import { CommonModule } from '@angular/common';
import { Component, EventEmitter, model, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
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
    ButtonModule,
  ],
  templateUrl: './sign-up-step-1.component.html',
  styleUrl: './sign-up-step-1.component.scss',
})
export class SignUpStep1Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  password = model.required<string>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }

  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      this.haveLetterValidator,
      this.haveSpecialCharacterValidator,
      Validators.minLength(10),
    ]),
  });

  private haveLetterValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (!/[a-zA-Z]/.test(control.value)) {
      return { noLetter: true };
    }
    return null;
  }

  private haveSpecialCharacterValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (!/[\d#?!&]/.test(control.value)) {
      return { noSpecialCharacter: true };
    }
    return null;
  }
}
