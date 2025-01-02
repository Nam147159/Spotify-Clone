import { Component, Input } from '@angular/core';
import { Album, DBPlaylist, Track } from '../../models/spotify.model';
import { PlayerService } from '../../../services/player-service/player.service';
import { TokenService } from '../../../services/token-service/token.service';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from '../../../services/database-service/database.service';
import { StorageService } from '../../../services/storage-service/storage.service';

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
  playlists: DBPlaylist[] = [];

  isCurrentlyPlaying = false;
  deviceID: string | null = null;

  constructor(
    private playerService: PlayerService,
    private storageService: StorageService,
    private databaseService: DatabaseService
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

  ShowList(event: MouseEvent) {
    event.stopPropagation();
    const identifier = this.storageService.getItem('identifier');
    if (identifier) {
      this.databaseService.getUserID(identifier).subscribe({
        next: (response) => {
          console.log('Response :', response);
          const ownerID = response.userID.id; // Giả sử API trả về một đối tượng có thuộc tính ownerID
          this.loadPlaylists(ownerID);
        },
        error: (err) => {
          console.error('Error getting ownerID:', err);
        }
      });
    } else {
      console.error('Identifier not found in storage');
    }
  }

  loadPlaylists(ownerID: string) {
    this.databaseService.loadPlaylists(ownerID).subscribe({
      next: (data) => {
        this.playlists = data.playlists; // Giả sử API trả về một đối tượng có thuộc tính playlists
        console.log('Playlists loaded:', this.playlists);
      },
      error: (err) => {
        console.error('Error loading playlists:', err);
      }
    });
  }

  AddIntoPlaylist(playlistID: string, event: MouseEvent) {
    event.stopPropagation();
    console.log('Add into playlist track: ', this.track);
    this.databaseService.addTrackToPlaylist(playlistID, this.track.id).subscribe({
      next: (response) => {
        console.log('Response :', response);
      },
      error: (err) => {
        console.error('Error adding track to playlist:', err);
      },
      complete: () => {
        console.log('Adding track to playlist completed');
      }
    });
  }
}
