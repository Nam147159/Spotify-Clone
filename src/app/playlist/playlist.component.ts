import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { PlaylistService } from '../../services/playlist-service/playlist.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from '../models/spotify.model';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  providers: [PlaylistService],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  @Input() playlist!: Playlist;
  @Output() selectPlaylist = new EventEmitter<Playlist>();

  onClick() {
    this.selectPlaylist.emit(this.playlist); // Emit the selected playlist when clicked
  }

}
