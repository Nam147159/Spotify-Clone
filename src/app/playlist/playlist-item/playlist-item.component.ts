import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player-service/player.service';
import { StorageService } from '../../../services/storage-service/storage.service';
import { DatabaseService } from '../../../services/database-service/database.service';
import { TrackService } from '../../../services/track-service/track.service';
import { DBPlaylist, Track } from '../../models/spotify.model';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  imports: [],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.scss',
})
export class PlaylistItemComponent implements OnInit {
  @Input({ required: true }) index!: number;
  @Input({ required: true }) currentTrackId!: string;
  @Input({ required: true }) trackItemIds!: string[];
  playlists: DBPlaylist[] = [];
  currentTrackObject!: Track;
  deleteID!: string;

  showPlaylists: boolean = false;
  successMessage: string = '';

  constructor(
    private readonly playerSerivice: PlayerService,
    private readonly storageService: StorageService,
    private readonly databaseService: DatabaseService,
    private trackService: TrackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Playlist item initialized:', this.currentTrackId);

    this.trackService.getTrack(this.currentTrackId).subscribe({
      next: (response) => {
        console.log('Track info:', response);
        this.currentTrackObject = response.data;
      },
      error: (err) => {
        console.error('Error getting track info:', err);
      },
      complete: () => {
        console.log('Getting track info completed');
      },
    });
  }

  async onClick() {
    if (!this.playerSerivice) {
      return;
    }
    console.log('Playing track:', this.currentTrackId);
    console.log('track ids:', this.trackItemIds);
    this.playerSerivice.setTracks(this.trackItemIds, { position: this.index });
  }

  isCurrentlyPlaying = false;
  deviceID: string | null = null;

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
          const ownerID = response.userID.id;
          this.loadPlaylists(ownerID);
        },
        error: (err) => {
          console.error('Error getting ownerID:', err);
        },
      });
    } else {
      console.error('Identifier not found in storage');
    }

    this.showPlaylists = !this.showPlaylists;
  }

  loadPlaylists(ownerID: string) {
    this.databaseService.loadPlaylists(ownerID).subscribe({
      next: (data) => {
        this.playlists = data.playlists;
        console.log('Playlists loaded:', this.playlists);
      },
      error: (err) => {
        console.error('Error loading playlists:', err);
      },
    });
  }

  deletePlaylist(event: MouseEvent) {
    event.stopPropagation();
    this.route.paramMap.subscribe(params => {
      const playlistID = params.get('id');
      if (playlistID) {
        this.deleteID = playlistID;
      } else {
        console.error('Playlist ID is null');
      }
    });
    this.databaseService
      .deletePlaylist(this.deleteID, this.currentTrackId)
      .pipe(
        finalize(() => {
          console.log('Deleted track successfuly');
          this.successMessage = 'Track deleted successfully!';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
          this.showPlaylists = false;
          console.log('Message: ', this.successMessage);
          window.location.reload();
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Response :', response);
        },
        error: (err) => {
          console.error('Error deleting track in playlist:', err);
        },
      });
  }

  AddIntoPlaylist(playlistID: string, event: MouseEvent) {
    event.stopPropagation();
    this.databaseService
      .addTrackToPlaylist(playlistID, this.currentTrackId)
      .subscribe({
        next: (response) => {
          console.log('Response :', response);
        },
        error: (err) => {
          console.error('Error adding track to playlist:', err);
        },
        complete: () => {
          console.log('Adding track to playlist completed');
        },
      });
    this.successMessage = 'Delete successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
    this.showPlaylists = false;
    console.log('Message: ', this.successMessage);
  }
}
