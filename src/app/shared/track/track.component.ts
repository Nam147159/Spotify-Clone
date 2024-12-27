import { Component, Input } from '@angular/core';
import { Track } from '../../models/spotify.model';
import { PlayerService } from '../../../services/player-service/player.service';
import { TokenService } from '../../../services/token-service/token.service';
import { firstValueFrom } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'track-card',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackCardComponent {
  @Input() track!: Track;
  @Input() index!: number;
  isCurrentlyPlaying = false;
  deviceID: string | null = null;

  constructor(private playerService: PlayerService, private tokenService: TokenService) {
    // Subscribe to player state to know if this track is currently playing
    this.playerService.playerState$.subscribe(state => {
      if (state.currentTrack) {
        this.isCurrentlyPlaying = state.currentTrack.id === this.track.id && state.isPlaying;
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
      }
    });
  }

  async onClick(): Promise<void> {
    console.log("Track ID: ", this.track.id);
    try {
      console.log("Device ID: ", this.deviceID);
      const tokenResponse = await firstValueFrom(this.tokenService.getAccessToken());
      const token = tokenResponse.token;

      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // You'll need to implement this
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [`spotify:track:${this.track.id}`]
        })
      });

      if (response.status === 204) {
        console.log('Track is playing (No content response)');
        return;
      }

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorData
        });
        throw new Error(`Failed to play track: ${response.statusText}`);
      }

      const data = await response.json();
      if (!response.ok) {
        console.error('Error playing track:', data);
      } else {
        console.log('Track is playing:', data);
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }

  }

  getArtistsString(): string {
    return this.track.artists.map(artist => artist.name).join(', ');
  }

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
