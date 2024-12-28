import { response } from 'express';
import { PlaylistService } from './../../services/playlist-service/playlist.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-library-panel',
  standalone: true,
  imports: [PlaylistComponent],
  templateUrl: './library-panel.component.html',
  styleUrl: './library-panel.component.scss',
})
export class LibraryPanelComponent implements OnInit {
  @ViewChild(PlaylistComponent) playlistComponent!: PlaylistComponent;
  showTooltip: boolean = false;
  isPlaylistVisible: boolean = false;
  isAuthenticated: boolean = false;
  newPlaylistID: string | undefined;
  newPlaylistName: string | undefined;

  constructor(private router: Router, private authService: AuthenticationService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  toggleTooltip() {
    if (this.isAuthenticated) {
      this.createNewPlaylist();
    }
    else {
      this.showTooltip = !this.showTooltip;
    }
  }

  createNewPlaylist() {
    this.playlistService.createNewPlaylist('New Playlist', 'Description', false).subscribe({
      next: (response) => {
        console.log('New playlist created');
        console.log(response);
        this.newPlaylistID = response.data.id;
        this.newPlaylistName = response.data.name;
        this.isPlaylistVisible = true;
        this.router.navigate(['/playlist', this.newPlaylistID]);
      },
      error: (error) => {
        console.error('Error creating playlist: ', error);
      },
      complete: () => {
        console.log('Create playlist request completed');
      }
    })
    console.log('New playlist created');
  }

  public changePlaylistVisibility(value: boolean) {
    this.isPlaylistVisible = value;
  }
}


