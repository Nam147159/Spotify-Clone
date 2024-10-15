import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, Output } from '@angular/core';
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

  @Input({ required: true }) passwordForm: FormGroup = new FormGroup({});

  public emitNextStep(): void {
    this.nextStep.emit();
  }
}
