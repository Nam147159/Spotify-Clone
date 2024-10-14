import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-sign-up-step-3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
  ],
  templateUrl: './sign-up-step-3.component.html',
  styleUrl: './sign-up-step-3.component.scss'
})
export class SignUpStep3Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  public emitNextStep(): void {
    this.nextStep.emit();
  }

  form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      agree: new FormControl(false)
    });
  }
}
