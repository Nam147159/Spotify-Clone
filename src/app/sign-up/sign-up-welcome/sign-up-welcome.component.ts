import { Component, EventEmitter, Output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-sign-up-welcome',
  standalone: true,
  imports: [PasswordModule, MessageModule, DividerModule],
  templateUrl: './sign-up-welcome.component.html',
  styleUrl: './sign-up-welcome.component.scss',
})
export class SignUpWelcomeComponent {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }
}
