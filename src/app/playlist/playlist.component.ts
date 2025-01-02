import { PlaylistService } from './../../services/playlist-service/playlist.service';
import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  SimpleChanges,
  effect,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DBPlaylist, Playlist } from '../models/spotify.model';
import { PlaylistContextMenuComponent } from '../playlist-context-menu/playlist-context-menu.component';
import { PlaylistContextMenuService } from '../../services/playlist-context-menu-service/playlist-context-menu.service';
import { EditPlaylistDetailModalComponent } from "../edit-playlist-detail-modal/edit-playlist-detail-modal.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [PlaylistContextMenuComponent],
  providers: [PlaylistService],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  @Input() playlist!: Playlist;
  @Output() selectPlaylist = new EventEmitter<Playlist>();


  constructor(
    private playlistContextMenuService: PlaylistContextMenuService,
    private playlistService: PlaylistService) {
    effect(() => {
      const updatedPlaylist = this.playlistService.getPlaylistSignal()();
      if (updatedPlaylist && updatedPlaylist.id === this.playlist.id) {
        this.playlist.name = updatedPlaylist.name;
        this.playlist.description = updatedPlaylist.description;
        console.log('Playlist updated via signal:', this.playlist);
      }
    });
  }

  ngOnInit(): void {
    // console.log('PlaylistComponent initialized with playlist:', this.playlist);
    // this.playlistService.playlist$.subscribe(updatedPlaylist => {
    //   console.log("Updated Playlist: ", updatedPlaylist);
    //   if (updatedPlaylist && updatedPlaylist.id === this.playlist.id) {
    //     if (this.playlist) {
    //       console.log('Updating playlist:', updatedPlaylist);
    //       this.playlist.name = updatedPlaylist.name;
    //       this.playlist.description = updatedPlaylist.description;
    //     }
    //   }
    // });
  }

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
    this.selectPlaylist.emit(this.playlist);
  }

}
