import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { ArtistCardComponent } from '../shared/artist-card/artist-card.component';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MainPanelService } from '../../services/main-panel-service/main-panel.service';
import { response } from 'express';
import { error } from 'console';
import { Album, Artist } from '../models/spotify.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent, ArtistCardComponent, ScrollerModule, ScrollPanelModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent implements OnInit {
  popularArtists: Artist[] = [];
  popularAlbums: Album[] = [];

  constructor(private mainPanelService: MainPanelService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPopularArtists();
    this.fetchPopularAlbums();
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

          console.log("Albums ID")
          this.popularAlbums.forEach(album => {
            console.log(album.id);
          });

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

  // navigateToAlbumDetail(album: any) {
  //   this.router.navigate(['/album', album], { 
  //     state: { album: album } 
  //   });
  // }
}
