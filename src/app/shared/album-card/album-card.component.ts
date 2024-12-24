import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Album } from '../../models/spotify.model';

@Component({
  selector: 'album-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent implements OnInit {
  @Input() album!: Album;
  @Input() width: string = '200px';

  ngOnInit() {
  }

  get artistNames(): string {
    return this.album.artists.map(artist => artist.name).join(', ');
  }

  isHovered: boolean = false;

  onHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }

  getImageUrl(): string | null {
    return this.album.images && this.album.images.length > 0 
      ? this.album.images[0].url 
      : null;
  }

  getArtistNames(): string {
    return this.album.artists
      .map(artist => artist.name)
      .join(', ');
  }
}
