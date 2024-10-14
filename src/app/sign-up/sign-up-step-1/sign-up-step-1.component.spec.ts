import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStep1Component } from './sign-up-step-1.component';

describe('SignUpStep1Component', () => {
  let component: SignUpStep1Component;
  let fixture: ComponentFixture<SignUpStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
