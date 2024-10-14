import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss',
})
export class StepIndicatorComponent {
  @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) public currentStep: number = 0;

  public emitPreviousStep(): void {
    this.previousStep.emit();
  }
}
