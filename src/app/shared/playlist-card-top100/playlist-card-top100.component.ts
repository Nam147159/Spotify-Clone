import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from '../../models/spotify.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'playlist-card-top100',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './playlist-card-top100.component.html',
  styleUrls: ['./playlist-card-top100.component.scss']
})
export class PlaylistCardTop100Component implements OnInit {
  @Input() playlist!: Playlist;
  @Input() width: string = '200px';
  @Output() clickEvent = new EventEmitter<Playlist>();

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

  onTop100Click(): void {
    this.clickEvent.emit(this.playlist);
    console.log('top100 playlist clicked');
    this.router.navigate(['/top100', this.playlist.id]);
  }
}
