import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistContextMenuService {
  private contextMenuSubject = new Subject<{ x: number, y: number, visible: boolean }>();
  contextMenuState$ = this.contextMenuSubject.asObservable();

  showContextMenu(x: number, y: number) {
    this.contextMenuSubject.next({ x, y, visible: true });
  }

  hideContextMenu() {
    this.contextMenuSubject.next({ x: 0, y: 0, visible: false });
  }

}
