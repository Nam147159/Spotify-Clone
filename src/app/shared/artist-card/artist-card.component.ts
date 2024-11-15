import { Component, Input } from '@angular/core';
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
export class ArtistCardComponent {
  @Input() artist!: Artist;
}
