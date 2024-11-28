import { Component, Input, OnInit  } from '@angular/core';
import {Playlist} from '../../models/spotify.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'playlist-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist!: Playlist; 

  ngOnInit() {
  }

  isHovered: boolean = false

  onHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }

  getImageUrl(): string | null {
    return this.playlist && this.playlist.images && this.playlist.images.length > 0 
      ? this.playlist.images[0].url 
      : null;
  }
}
