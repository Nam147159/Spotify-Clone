import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { ArtistCardComponent } from '../shared/artist-card/artist-card.component';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent, ArtistCardComponent, ScrollerModule, ScrollPanelModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent {
  popularAlbums = [
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
    { name: 'Album 1', image: 'https://i.scdn.co/image/ab67616d00001e0226597c053b38c9cf93f8f3a9', artistNames: 'Artist names' },
  ];

  popularArtists = [
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
    { name: 'Name', image: 'https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60', type: 'Artist' },
  ];
}
