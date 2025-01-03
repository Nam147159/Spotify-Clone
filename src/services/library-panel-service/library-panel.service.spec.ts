import { TestBed } from '@angular/core/testing';

import { LibraryPanelService } from './library-panel.service';

describe('LibraryPanelService', () => {
  let service: LibraryPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
