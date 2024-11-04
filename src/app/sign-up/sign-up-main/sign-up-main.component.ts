import { Component } from '@angular/core';
import { SignUpWelcomeComponent } from '../sign-up-welcome/sign-up-welcome.component';
import { SignUpStep1Component } from '../sign-up-step-1/sign-up-step-1.component';
import { SignUpStep2Component } from '../sign-up-step-2/sign-up-step-2.component';
import { SignUpStep3Component } from '../sign-up-step-3/sign-up-step-3.component';
import { StepIndicatorComponent } from '../step-indicator/step-indicator.component';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from '../../../services/sign-up-service/sign-up.service';

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
  providers: [SignUpService]
})
export class SignUpMainComponent {

  constructor(private signupService: SignUpService) {}

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
      const formData = {
        email: this.form.get("emailForm")!.get("email")!.value,
        password: this.form.get("passwordForm")!.get("password")!.value,
        username: this.form.get("infoForm")!.get("username")!.value,
        dateOfBirth: this.form.get("infoForm")!.get("date")!.value,
        gender: this.form.get("infoForm")!.get("gender")!.value,
        //ads: this.form.get("registerForm")!.get("ads")!.value,
        //share: this.form.get("registerForm")!.get("share")!.value,
    };
     
      this.signupService.register(formData).subscribe({
        next: (response) => {
          console.log('User registered:', response);
          alert('Đăng ký thành công!');
        },
        error: (error) => {
            console.error('Error during registration:', error);
            alert('Đăng ký thất bại!');
        }
      });

      return;
    }
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }
}
