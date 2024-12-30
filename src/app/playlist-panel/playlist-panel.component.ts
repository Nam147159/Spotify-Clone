import { response } from 'express';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { Playlist } from '../models/spotify.model';
import { StorageService } from '../../services/storage-service/storage.service';
import { PlaylistComponent } from '../playlist/playlist.component';

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
  playlists: Playlist[] = [];
  @Input() receivedPlaylists: Playlist[] = [];

  constructor(
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private el: ElementRef, 
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.adjustHeight();
  }

  loadPlaylists() {
    this.databaseService.loadPlaylists(this.ownerID).subscribe({
      next: (response) => {
        this.playlists = response.playlists;
        console.log(this.playlists);
      },
      error: (error) => {
        console.error("Error loading playlists: ", error);
      },
      complete: () => {
        console.log("Load Playlists Complete");
      }
    });
  }

  adjustHeight(): void {
    const playlistCount = this.playlists.length;
    const heightPerPlaylist = 50; // Adjust this value based on your design
    const totalHeight = playlistCount * heightPerPlaylist;

    this.renderer.setStyle(this.el.nativeElement, 'height', `${totalHeight}px`);
  }

}
