import { CommonModule } from '@angular/common';
import {
  Component,
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
@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [],
  providers: [MessageService, ConfirmationService, DialogService],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit {
  playlist?: DBPlaylist;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const playlistId = params.get('id');
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
  }


}
