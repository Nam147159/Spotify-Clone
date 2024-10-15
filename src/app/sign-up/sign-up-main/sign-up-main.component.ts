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

  public infoForm = new FormGroup({
    username: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  public registerForm = new FormGroup({
    ads: new FormControl(false, Validators.requiredTrue),
    share: new FormControl(false, Validators.requiredTrue),
  });

  public form = new FormGroup({
    emailForm: this.emailForm,
    passwordForm: this.passwordForm,
    infoForm: this.infoForm,
    registerForm: this.registerForm,
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
      const username = this.form.get("infoForm")!.get("username")!.value;
      const date = this.form.get("infoForm")!.get("date")!.value;
      const gender = this.form.get("infoForm")!.get("gender")!.value;
      const ads = this.form.get("registerForm")!.get("ads")!.value;
      const share = this.form.get("registerForm")!.get("share")!.value;
      alert(`
email: ${email}
password: ${password}
username: ${username}
date: ${date}
gender: ${gender}
ads: ${ads}
share: ${share}
        `);
      return;
    }
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }
}
