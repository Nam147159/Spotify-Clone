import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-step-1',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-step-1.component.html',
  styleUrl: './sign-up-step-1.component.scss',
})
export class SignUpStep1Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }
}
