import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStep2Component } from './sign-up-step-2.component';

describe('SignUpStep2Component', () => {
  let component: SignUpStep2Component;
  let fixture: ComponentFixture<SignUpStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
