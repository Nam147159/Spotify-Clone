import { Component } from '@angular/core';
import { SignUpWelcomeComponent } from '../sign-up-welcome/sign-up-welcome.component';
import { SignUpStep1Component } from '../sign-up-step-1/sign-up-step-1.component';
import { SignUpStep2Component } from '../sign-up-step-2/sign-up-step-2.component';
import { SignUpStep3Component } from '../sign-up-step-3/sign-up-step-3.component';
import { StepIndicatorComponent } from '../step-indicator/step-indicator.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    SignUpWelcomeComponent,
    SignUpStep1Component,
    SignUpStep2Component,
    SignUpStep3Component,
    StepIndicatorComponent,
  ],
  templateUrl: './sign-up-main.component.html',
  styleUrls: ['./sign-up-main.component.scss'],
})
export class SignUpMainComponent {
  public step = 0;
  public password = '';
  public email = '';

  public nextStep(): void {
    if (this.step === 3) {
      alert(`
Passsword: ${this.password}
Email: ${this.email}
`);
      return;
    }
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }
}
