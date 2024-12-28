import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePanelComponent } from './browse-panel.component';

describe('BrowsePanelComponent', () => {
  let component: BrowsePanelComponent;
  let fixture: ComponentFixture<BrowsePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
