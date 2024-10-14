import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss',
})
export class StepIndicatorComponent {
  @Output() previousStep: EventEmitter<void> = new EventEmitter<void>();

  currentStep = input.required<number>();

  private readonly steps: Record<number, string> = {
    1: 'Create a password',
    2: 'Tell us about yourself',
    3: 'Terms & Conditions',
  };

  public stepName: Signal<string> = computed(
    () => this.steps[this.currentStep()],
  );

  public stepProgress: Signal<number> = computed(() => {
    return (this.currentStep() / 3) * 100;
  });

  public emitPreviousStep(): void {
    this.previousStep.emit();
  }
}
