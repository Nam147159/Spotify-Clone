import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/spotify.model';

@Component({
  selector: 'artist-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent implements OnInit {
  @Input() artist!: Artist;

  ngOnInit() {
  }

  getImageUrl(): string | null {
    console.log('Images array:', this.artist.images)
    return this.artist.images && this.artist.images.length > 0
      ? this.artist.images[0].url 
      : null;
  }
}
