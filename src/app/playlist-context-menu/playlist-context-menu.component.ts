import { Component, HostListener, Input } from '@angular/core';
import { PlaylistContextMenuService } from '../../services/playlist-context-menu-service/playlist-context-menu.service';

@Component({
  selector: 'app-playlist-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './playlist-context-menu.component.html',
  styleUrl: './playlist-context-menu.component.scss'
})
export class PlaylistContextMenuComponent {
  isVisible = false;
  x = 0;
  y = 0;

  constructor(
    private playlistContextMenuService: PlaylistContextMenuService) { }

  ngOnInit(): void {
    this.playlistContextMenuService.contextMenuState$.subscribe(state => {
      this.isVisible = state.visible;
      this.x = state.x;
      this.y = state.y;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.context-menu')) {
      this.playlistContextMenuService.hideContextMenu();
    }
  }

  onAction(action: string): void {
    console.log(`${action} selected`);
    this.isVisible = false; // Close menu after selection
  }
}
