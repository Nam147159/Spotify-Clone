import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-sign-up-step-3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './sign-up-step-3.component.html',
  styleUrl: './sign-up-step-3.component.scss'
})
export class SignUpStep3Component {
  @Input({ required: true }) registerForm: FormGroup = new FormGroup({});

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }

  changeBorderColor(event: Event, state: string): void {

    const target = event.target as HTMLElement;

    if (state === 'hover') {

      target.style.borderColor = '#1DB954';

    } else {

      target.style.borderColor = '#818181';

    }

  }
}
