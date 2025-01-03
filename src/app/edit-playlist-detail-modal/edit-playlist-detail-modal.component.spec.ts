import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistDetailModalComponent } from './edit-playlist-detail-modal.component';

describe('EditPlaylistDetailModalComponent', () => {
  let component: EditPlaylistDetailModalComponent;
  let fixture: ComponentFixture<EditPlaylistDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlaylistDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlaylistDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
