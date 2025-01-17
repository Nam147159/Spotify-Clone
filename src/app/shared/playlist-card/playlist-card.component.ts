import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from '../../models/spotify.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'playlist-card',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist!: Playlist;
  @Input() width: string = '200px';
  @Output() clickEvent = new EventEmitter<string>();

  constructor(private router: Router) { }

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

  onRecommendPlaylistClick(): void {
    this.clickEvent.emit(this.playlist.id);
    console.log('recommend playlist clicked');
    this.router.navigate(['/recommendplaylist', this.playlist.id]);
  }
}
