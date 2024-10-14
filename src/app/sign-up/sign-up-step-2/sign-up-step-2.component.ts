import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { info } from 'console';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
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
    
  ],
  templateUrl: './sign-up-step-2.component.html',
  styleUrl: './sign-up-step-2.component.scss'
})

export class SignUpStep2Component {
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  public emitNextStep(): void {
    this.nextStep.emit();
  }
  infoForm!: FormGroup;

  genders: any[] = [
    { label: 'Nam', code: 'Male'},
    { label: 'Nữ', code: 'Female'},
    { label: 'Không phân biệt giới tính', code: 'Not'},
    { label: 'Giới tính khác', code: 'Other'},
    { label: 'Không muốn nêu cụ thể', code: 'None'}
  ];
  
  months: any[] = [
    { label: 'January', code: 1 },
    { label: 'February', code: 2 },
    { label: 'March', code: 3 },
    { label: 'April', code: 4 },
    { label: 'May', code: 5 },
    { label: 'June', code: 6 },
    { label: 'July', code: 7 },
    { label: 'August', code: 8 },
    { label: 'September', code: 9 },
    { label: 'October', code: 10 },
    { label: 'November', code: 11 },
    { label: 'December', code: 12 }
  ]

  ngOnInit() {
    this.infoForm = new FormGroup({
      username: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }
}
