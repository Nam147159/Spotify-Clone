import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Album } from '../../models/spotify.model';
import { Router } from '@angular/router';
import { TrackService } from '../../../services/track-service/track.service';

@Component({
  selector: 'album-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent implements OnInit {
  @Input() album!: Album;
  @Output() albumClick = new EventEmitter<string>();

  constructor(private router: Router, private trackService: TrackService) {}
  
  ngOnInit() {
    // this.fetchTracks(this.album.id);
  }

  // fetchTracks(albumId: string) {
  //   this.trackService.getTracksFromAlbum(albumId).subscribe({
  //     next: (response) => {
  //       console.log('Tracks from API:', response.data);
  //       this.tracks = response.data; // Gán dữ liệu vào biến `tracks`
  //     },
  //     error: (error) => {
  //       console.error('Error fetching tracks:', error);
  //       this.errorMessage = 'Unable to fetch tracks. Please try again later.';
  //     }
  //   });
  // }

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

  onAlbumClick(): void {
    console.log("Selected Album: ", this.album.id);
    this.albumClick.emit(this.album.id);
    this.router.navigate(['/album', this.album.id]);
  }
}
