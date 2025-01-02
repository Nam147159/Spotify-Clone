import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database-service/database.service';
import { Playlist } from '../models/spotify.model';
import { PlaylistService } from '../../services/playlist-service/playlist.service';

@Component({
  selector: 'app-edit-playlist-detail-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-playlist-detail-modal.component.html',
  styleUrl: './edit-playlist-detail-modal.component.scss'
})
export class EditPlaylistDetailModalComponent implements OnInit {
  isOpen: boolean = false;
  playlistID!: string;
  editForm: FormGroup;
  @Output() onSave = new EventEmitter<{ title: string, description: string }>();

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private playlistService: PlaylistService) {
    this.editForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit(): void {

  }

  close() {
    this.isOpen = false;
  }

  save() {
    if (this.editForm.valid) {
      const title = this.editForm.get('title')!.value;
      const description = this.editForm.get('description')!.value;

      this.databaseService.changePlaylistName(this.playlistID, title).subscribe(() => {
        const id = this.playlistID;
        this.playlistService.updatePlaylistSignal(id, title, description);
        this.onSave.emit({ title, description });
        this.close();
      });
    }
  }

}
