import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { ArtistCardComponent } from '../shared/artist-card/artist-card.component';
import {PlaylistCardComponent} from '../shared/playlist-card/playlist-card.component';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MainPanelService } from '../../services/main-panel-service/main-panel.service';
import { response } from 'express';
import { error } from 'console';
import { Album, Artist, Playlist } from '../models/spotify.model';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent, ArtistCardComponent, PlaylistCardComponent, ScrollerModule, ScrollPanelModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent implements OnInit {
  popularArtists: Artist[] = [];
  popularAlbums: Album[] = [];
  recommendedPlaylists: Playlist[] = [];
  top100Playlists: Playlist[] = [];

  constructor(private mainPanelService: MainPanelService) { }

  ngOnInit(): void {
    this.fetchPopularArtists();
    this.fetchPopularAlbums();
    this.fetchRecommendedPlaylists();
    this.fetchTop100Playlists();
  }

  fetchPopularArtists(): void {
    this.mainPanelService.getPopularArtists().subscribe({
      next: (response: { success: boolean; message: string; data: Artist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularArtists = response.data;
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular artists:', error);
      },
      complete: () => {
        console.log('Popular artists fetch complete');
      }
    });
  }

  fetchPopularAlbums(): void {
    this.mainPanelService.getPopularAlbums().subscribe({
      next: (response: { success: boolean; message: string; data: Album[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularAlbums = response.data;
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular albums:', error);
      },
      complete: () => {
        console.log('Popular albums fetch complete');
      }
    });
  }

  fetchRecommendedPlaylists(): void {
    this.mainPanelService.getRecommendedPlaylists().subscribe({
      next: (response: { success: boolean; message: string; data: Playlist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.recommendedPlaylists = response.data;
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching recommend playlists:', error);
      },
      complete: () => {
        console.log('Top recommend fetch complete');
      }
    });
  }

  fetchTop100Playlists(): void {
    this.mainPanelService.getTop100Playlists().subscribe({
      next: (response: { success: boolean; message: string; data: Playlist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.top100Playlists = response.data;
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching top 100 playlists:', error);
      },
      complete: () => {
        console.log('Top 100 playlists fetch complete');
      }
    });
  }
}
