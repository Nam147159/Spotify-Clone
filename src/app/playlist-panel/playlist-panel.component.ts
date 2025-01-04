import { response } from 'express';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { Playlist } from '../models/spotify.model';
import { StorageService } from '../../services/storage-service/storage.service';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist-service/playlist.service';

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
    private router: Router,
    private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.playlist$.subscribe(playlists => {
      if (playlists) {
        this.receivedPlaylists = playlists;
      }
    });
    this.adjustHeight();
  }

  adjustHeight(): void {
    const playlistCount = this.receivedPlaylists.length;
    const heightPerPlaylist = 50; // Adjust this value based on your design
    const totalHeight = playlistCount * heightPerPlaylist;

    this.renderer.setStyle(this.el.nativeElement, 'height', `${totalHeight}px`);
  }

  async onSelectPlaylist(playlist: Playlist) {
    try {
      // Get current URL
      const currentUrl = this.router.url;
      console.log('Current URL:', currentUrl);
      // Create target URL
      const targetUrl = `/playlist/${playlist.id}`;
      
      if (currentUrl === targetUrl) {
        // If navigating to same URL, reload the route
        await this.router.navigateByUrl('/', { skipLocationChange: true });
        await this.router.navigate([targetUrl]);
      } else {
        // Navigate to new playlist
        await this.router.navigateByUrl('/', { skipLocationChange: true });
        await this.router.navigate([targetUrl]);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

}
