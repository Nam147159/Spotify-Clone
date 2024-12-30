import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistContextMenuComponent } from './playlist-context-menu.component';

describe('PlaylistContextMenuComponent', () => {
  let component: PlaylistContextMenuComponent;
  let fixture: ComponentFixture<PlaylistContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistContextMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
