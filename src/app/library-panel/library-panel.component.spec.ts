import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPanelComponent } from './library-panel.component';

describe('LibraryPanelComponent', () => {
  let component: LibraryPanelComponent;
  let fixture: ComponentFixture<LibraryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
