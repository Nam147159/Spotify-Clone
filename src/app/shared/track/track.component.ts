import { Component, Input } from '@angular/core';
import { Album, Track } from '../../models/spotify.model';
import { PlayerService } from '../../../services/player-service/player.service';
import { TokenService } from '../../../services/token-service/token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'track-card',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackCardComponent {
  @Input({ required: true }) track!: Track;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) album!: string;

  isCurrentlyPlaying = false;
  deviceID: string | null = null;

  constructor(
    private playerService: PlayerService,
    private tokenService: TokenService,
  ) {
    // Subscribe to player state to know if this track is currently playing
    this.playerService.playerState$.subscribe((state) => {
      if (state.currentTrack) {
        this.isCurrentlyPlaying =
          state.currentTrack.id === this.track.id && state.isPlaying;
      } else {
        this.isCurrentlyPlaying = false;
      }
    });

    this.playerService.getDeviceId().subscribe({
      next: (id) => {
        console.log('Received device ID:', id);
        this.deviceID = id;
      },
      error: (error) => {
        console.error('Error getting device ID:', error);
      },
      complete: () => {
        console.log('Device ID subscription completed');
      },
    });
  }

  async onClick(): Promise<void> {
    if (!this.playerService) {
      return;
    }
    if (!this.album) {
      console.error('No album provided');
    }
    this.playerService.setAlbum(this.album, {
      uri: this.track.uri,
    });
  }

  getArtistsString(): string {
    return this.track.artists.map((artist) => artist.name).join(', ');
  }

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
