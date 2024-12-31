import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  @Output() openEditModal = new EventEmitter<void>();

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
    this.isVisible = false;
  }

  onEditDetails() {
    console.log('Edit details clicked - before emit');
    this.openEditModal.emit();
    console.log('Edit details clicked - after emit');
  }
}
