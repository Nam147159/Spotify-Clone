import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-sign-up-welcome',
  standalone: true,
  imports: [
    PasswordModule,
    MessageModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './sign-up-welcome.component.html',
  styleUrl: './sign-up-welcome.component.scss',
})
export class SignUpWelcomeComponent {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();

  @Input({ required: true }) emailForm: FormGroup = new FormGroup({});


  public emitNextStep(): void {
    this.nextStep.emit();
  }
}
