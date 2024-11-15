import { Component, Input } from '@angular/core';
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
export class AlbumCardComponent {
  @Input() album!: Album;

  get artistNames(): string {
    return this.album.artists.map(artist => artist.name).join(', ');
  }

  isHovered: boolean = false;

  onHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }
}
