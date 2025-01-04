import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryPanelService {
  private isPlaylistVisibleSubject = new BehaviorSubject<boolean>(false);
  isPlaylistVisible$ = this.isPlaylistVisibleSubject.asObservable();

  setPlaylistVisibility(isVisible: boolean) {
    this.isPlaylistVisibleSubject.next(isVisible);
  }
}
