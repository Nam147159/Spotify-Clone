import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database-service/database.service';
import { Playlist } from '../models/spotify.model';

@Component({
  selector: 'app-edit-playlist-detail-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-playlist-detail-modal.component.html',
  styleUrl: './edit-playlist-detail-modal.component.scss'
})
export class EditPlaylistDetailModalComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
