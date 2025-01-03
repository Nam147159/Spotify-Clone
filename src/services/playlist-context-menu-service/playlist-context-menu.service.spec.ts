import { TestBed } from '@angular/core/testing';

import { PlaylistContextMenuService } from './playlist-context-menu.service';

describe('PlaylistContextMenuService', () => {
  let service: PlaylistContextMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistContextMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
