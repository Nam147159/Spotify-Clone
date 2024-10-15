import { Component } from '@angular/core';
import { SignUpWelcomeComponent } from '../sign-up-welcome/sign-up-welcome.component';
import { SignUpStep1Component } from '../sign-up-step-1/sign-up-step-1.component';
import { SignUpStep2Component } from '../sign-up-step-2/sign-up-step-2.component';
import { SignUpStep3Component } from '../sign-up-step-3/sign-up-step-3.component';
import { StepIndicatorComponent } from '../step-indicator/step-indicator.component';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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

  public emailForm = new FormGroup({
    email: new FormControl('', Validators.email),
  });

  public passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      this.haveLetterValidator,
      this.haveSpecialCharacterValidator,
      Validators.minLength(10),
    ]),
  });

  public form = new FormGroup({
    emailForm: this.emailForm,
    passwordForm: this.passwordForm,
  })


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

  public nextStep(): void {
    if (this.step === 3) {
      const email = this.form.get("emailForm")!.get("email")!.value;
      const password = this.form.get("passwordForm")!.get("password")!.value;
      alert(`
email: ${email}
password: ${password}
        `);
      return;
    }
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }
}
