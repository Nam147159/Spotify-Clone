import {
  Component,
  effect,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, } from 'primeng/dynamicdialog';
import { ActivatedRoute, } from '@angular/router';
import { DBPlaylist, } from '../../models/spotify.model';
import { DatabaseService } from '../../../services/database-service/database.service';
import { EditPlaylistDetailModalComponent } from '../../edit-playlist-detail-modal/edit-playlist-detail-modal.component';
import { PlaylistService } from '../../../services/playlist-service/playlist.service';
import { PlaylistItemComponent } from '../playlist-item/playlist-item.component';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [EditPlaylistDetailModalComponent, PlaylistItemComponent],
  providers: [MessageService, ConfirmationService, DialogService],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit {
  playlist?: DBPlaylist;
  playlistID: string | null = null;
  tracksID!: string[];

  @ViewChild(EditPlaylistDetailModalComponent) modal!: EditPlaylistDetailModalComponent;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private playlistService: PlaylistService) {
    effect(() => {
      const updatedPlaylist = this.playlistService.getPlaylistSignal()();
      if (this.playlist) {
        if (updatedPlaylist && updatedPlaylist.id === this.playlist.id) {
          this.playlist.name = updatedPlaylist.name;
          this.playlist.description = updatedPlaylist.description;
          console.log('Playlist updated via signal:', this.playlist);
        }
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const playlistId = params.get('id');
      this.playlistID = playlistId;
      if (playlistId) {
        this.loadPlaylistDetails(playlistId);
        this.loadPlaylistTracks(playlistId);
      }
    });

    this.playlistService.playlistUpdated$.subscribe(() => {
      if (this.playlistID) {
        this.loadPlaylistDetails(this.playlistID);
        this.loadPlaylistTracks(this.playlistID);
      }
    });
  }

  private loadPlaylistDetails(playlistId: string) {
    this.databaseService.getPlaylistById(playlistId).subscribe({
      next: (response) => {
        if (response.success) {
          this.playlist = response.playlist;
        } else {
          console.error('Failed to fetch playlist details:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching playlist details:', error);
      }
    });
  }

  private loadPlaylistTracks(playlistId: string) {
    this.databaseService.getTracksInPlaylist(playlistId).subscribe({
      next: (response) => {
        if (response.success) {
          this.tracksID = response.tracks.map((track: any) => track.track_id);
        } else {
          console.error('Failed to fetch playlist tracks:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching playlist tracks:', error);
      },
      complete: () => {
        console.log('Completed fetching playlist tracks');
      }
    });
  }

  onClickEdit() {
    if (this.modal && this.playlistID) {
      this.modal.playlistID = this.playlistID;
      this.modal.isOpen = true;
    }
  }

  onSave(updatedDetails: { title: string, description: string }) {
    if (this.playlist) {
      this.playlist.name = updatedDetails.title;
      this.playlist.description = updatedDetails.description;
    }
  }

}
