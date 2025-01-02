import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DBPlaylist, Playlist } from '../../models/spotify.model';
import { DatabaseService } from '../../../services/database-service/database.service';
import { EditPlaylistDetailModalComponent } from '../../edit-playlist-detail-modal/edit-playlist-detail-modal.component';
import { PlaylistService } from '../../../services/playlist-service/playlist.service';
@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [EditPlaylistDetailModalComponent],
  providers: [MessageService, ConfirmationService, DialogService],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit {
  playlist?: DBPlaylist;
  playlistID: string | null = null;

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
    });

    // this.playlistService.playlist$.subscribe(updatedPlaylist => {
    //   if (updatedPlaylist && updatedPlaylist.id === this.playlistID) {
    //     if (this.playlist) {
    //     this.playlist.name = updatedPlaylist.name;
    //     this.playlist.description = updatedPlaylist.description;
    //   }
    // }
    // });
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
