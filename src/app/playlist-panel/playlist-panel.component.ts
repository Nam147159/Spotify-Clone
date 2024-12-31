import { response } from 'express';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { Playlist } from '../models/spotify.model';
import { StorageService } from '../../services/storage-service/storage.service';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-panel',
  standalone: true,
  imports: [PlaylistComponent],
  templateUrl: './playlist-panel.component.html',
  styleUrl: './playlist-panel.component.scss'
})
export class PlaylistPanelComponent implements OnInit {
  ownerIdentifier: string = "";
  ownerID: string = "";
  @Input() receivedPlaylists: Playlist[] = [];

  constructor(
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router) { }

  ngOnInit(): void {
    this.adjustHeight();
  }

  adjustHeight(): void {
    const playlistCount = this.receivedPlaylists.length;
    const heightPerPlaylist = 50; // Adjust this value based on your design
    const totalHeight = playlistCount * heightPerPlaylist;

    this.renderer.setStyle(this.el.nativeElement, 'height', `${totalHeight}px`);
  }

  onSelectPlaylist(playlist: Playlist) {
    this.router.navigate(['/playlist', playlist.id]);
  }

}
