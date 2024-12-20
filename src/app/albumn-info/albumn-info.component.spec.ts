import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumnInfoComponent } from './albumn-info.component';

describe('AlbumnInfoComponent', () => {
  let component: AlbumnInfoComponent;
  let fixture: ComponentFixture<AlbumnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumnInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
