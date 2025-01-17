import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/spotify.model';
import { Router } from '@angular/router';

@Component({
  selector: 'artist-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent implements OnInit {
  @Input() artist!: Artist;
  @Input() width: string = '200px';

  isHovered: boolean = false

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }

  getImageUrl(): string | null {
    return this.artist.images && this.artist.images.length > 0
      ? this.artist.images[0].url
      : null;
  }

  onArtistClick(): void {
    console.log('artist playlist clicked');
    this.router.navigate(['/artist', this.artist.id]);
  }
}
