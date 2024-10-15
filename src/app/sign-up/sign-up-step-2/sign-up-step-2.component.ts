import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-sign-up-step-2',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    MessagesModule,
    CommonModule,
    CalendarModule
  ],
  templateUrl: './sign-up-step-2.component.html',
  styleUrl: './sign-up-step-2.component.scss'
})

export class SignUpStep2Component {
  @Input({ required: true }) infoForm: FormGroup = new FormGroup({});

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  public emitNextStep(): void {
    this.nextStep.emit();
  }
}
