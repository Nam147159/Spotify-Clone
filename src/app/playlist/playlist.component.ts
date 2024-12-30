import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from '@angular/core';
import { PlaylistService } from '../../services/playlist-service/playlist.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from '../models/spotify.model';
import { PlaylistContextMenuComponent } from '../playlist-context-menu/playlist-context-menu.component';
import { PlaylistContextMenuService } from '../../services/playlist-context-menu-service/playlist-context-menu.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [PlaylistContextMenuComponent],
  providers: [PlaylistService],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  @Input() playlist!: Playlist;
  @Output() selectPlaylist = new EventEmitter<Playlist>();

  constructor(
    private playlistContextMenuService: PlaylistContextMenuService) { }

  openContextMenu(event: MouseEvent): void {
    event.preventDefault();
    const menuWidth = 200;
    const menuHeight = 400;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 100;
    const playerBarHeight = 100;
    const margin = 10;

    // Calculate X position
    const menuX = event.clientX + menuWidth > screenWidth
      ? screenWidth - menuWidth - margin + 50
      : event.clientX + 50;

    // Calculate Y position
    const menuY = event.clientY + menuHeight > screenHeight - playerBarHeight
      ? screenHeight - menuHeight - playerBarHeight - margin
      : event.clientY;

    this.playlistContextMenuService.showContextMenu(menuX, menuY);
  }

  onClick() {
    this.selectPlaylist.emit(this.playlist); // Emit the selected playlist when clicked
  }

}
