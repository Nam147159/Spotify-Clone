import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardComponent } from './playlist-card-top100.component';

describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
