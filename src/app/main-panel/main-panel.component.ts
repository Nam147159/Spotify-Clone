import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener } from '@angular/core';
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
export class MainPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('mainDiv') mainDiv!: ElementRef;

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

  ngAfterViewInit(): void {
    this.calculateDisplayedItems();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.calculateDisplayedItems();
  }

  getMainWidth(): number {
    if (this.mainDiv && this.mainDiv.nativeElement) {
      const divWidth = this.mainDiv.nativeElement.offsetWidth;
      return divWidth;
    }
    return 1000;
  }

  calculateDisplayedItems(): number {
    const divWidth = this.getMainWidth();
    let itemsToShow = 1;

    if (divWidth > 1200) {
      itemsToShow = 7;
    } else if (divWidth > 992) {
      itemsToShow = 5;
    } else if (divWidth > 768) {
      itemsToShow = 4;
    } else if (divWidth > 576) {
      itemsToShow = 3;
    } else if (divWidth > 400) {
      itemsToShow = 2;
    }
    return itemsToShow;
  }

  fetchPopularArtists(): void {
    this.mainPanelService.getPopularArtists().subscribe({
      next: (response: { success: boolean; message: string; data: Artist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularArtists = response.data;

          this.popularArtists = this.popularArtists.filter(artist => artist.name && artist.type && artist.images && artist.images.length > 0);
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

          this.popularAlbums = this.popularAlbums.filter(album => album && album.name && album.artists && album.images && album.images.length > 0);
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

            //Filter data that has name, description, and images
            this.recommendedPlaylists = this.recommendedPlaylists.filter(playlist => playlist && playlist.name && playlist.description && playlist.images && playlist.images.length > 0);
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

          //Filter data that has name, description, and images
          this.top100Playlists = this.top100Playlists.filter(playlist => playlist && playlist.name && playlist.description && playlist.images && playlist.images.length > 0 );
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
