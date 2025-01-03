import { response } from 'express';
import { PlaylistService } from './../../services/playlist-service/playlist.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { DatabaseService } from '../../services/database-service/database.service';
import { StorageService } from '../../services/storage-service/storage.service';
import { PlaylistPanelComponent } from "../playlist-panel/playlist-panel.component";
import { switchMap } from 'rxjs';
import { Playlist } from '../models/spotify.model';
import { LibraryPanelService } from '../../services/library-panel-service/library-panel.service';

@Component({
  selector: 'app-library-panel',
  standalone: true,
  imports: [PlaylistPanelComponent],
  templateUrl: './library-panel.component.html',
  styleUrl: './library-panel.component.scss',
})
export class LibraryPanelComponent implements OnInit {
  @ViewChild(PlaylistComponent) playlistComponent!: PlaylistComponent;
  showTooltip: boolean = false;
  isPlaylistVisible: boolean = false;
  isAuthenticated: boolean = false;
  ownerIdentifier: string = "";
  ownerID: string = "";
  newPlaylistID: string = "";
  newPlaylistName: string = "";
  newPlaylistDescription: string = "";
  newPlaylistPublic: boolean = false;
  playlists: Playlist[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private playlistService: PlaylistService,
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private libraryPanelService: LibraryPanelService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      if (this.isAuthenticated) {
        this.loadPlaylists();
      }
    });

    this.libraryPanelService.isPlaylistVisible$.subscribe(isVisible => {
      this.isPlaylistVisible = isVisible;
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

  createPlaylistWithAddBtn() {
    if (this.isAuthenticated) {
      this.createNewPlaylist();
    }
  }

  createNewPlaylist() {
    this.playlistService.createNewPlaylist('Test Playlist', 'Description', false).pipe(
      switchMap(response => {
        console.log('New playlist created');
        console.log(response);
        this.newPlaylistID = response.data.id;
        this.newPlaylistName = response.data.name;
        this.newPlaylistDescription = response.data.description;
        this.newPlaylistPublic = response.data.public;

        this.ownerIdentifier = this.storageService.getItem('identifier') ?? '';
        if (!this.ownerIdentifier) {
          console.error('Identifier is not available in session storage.');
          throw new Error('Identifier is not available in session storage.');
        }

        return this.databaseService.getUserID(this.ownerIdentifier);
      }),
      switchMap(response => {
        if (response.success) {
          console.log('User ID retrieved: ', response.userID.id);
          this.ownerID = response.userID.id;
          return this.databaseService.saveNewPlaylist(this.newPlaylistID, this.ownerID, this.newPlaylistName, this.newPlaylistDescription, this.newPlaylistPublic);
        } else {
          console.error('Failed to fetch user ID: ', response.message);
          throw new Error('Failed to fetch user ID');
        }
      }),
      switchMap(() => {
        return this.databaseService.loadPlaylists(this.ownerID);
      })
    ).subscribe({
      next: (response) => {
        console.log('Playlist saved into database');
        console.log(response);
        this.playlists = response.playlists;
        this.isPlaylistVisible = true;
        this.router.navigate(['/playlist', this.newPlaylistID]);
      },
      error: (error) => {
        console.error('Error: ', error);
      },
      complete: () => {
        console.log('Create playlist request completed');
      }
    });
  }

  public changePlaylistVisibility(value: boolean) {
    this.isPlaylistVisible = value;
  }

  // public onPlaylistCreated() {
  //   this.ownerIdentifier = this.storageService.getItem('identifier') ?? '';
  //   if (!this.ownerIdentifier) {
  //     console.error('Identifier is not available in session storage.');
  //     return;
  //   }
  //   this.databaseService.getUserID(this.ownerIdentifier).subscribe({
  //     next: (response) => {
  //       if (response.success) {
  //         console.log('User ID retrieved: ', response.userID.id);
  //         this.ownerID = response.userID.id;
  //         this.savePlaylistIntoDatabase();
  //       } else {
  //         console.error('Failed to fetch user ID: ', response.message);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error retrieving user ID: ', error);
  //     },
  //     complete: () => {
  //       console.log('User ID retrieval completed');
  //     }
  //   });
  // }

  // savePlaylistIntoDatabase() {
  //   this.databaseService.saveNewPlaylist(this.newPlaylistID, this.ownerID, this.newPlaylistName, this.newPlaylistDescription, this.newPlaylistPublic).subscribe({
  //     next: (response) => {
  //       console.log('Playlist saved into database');
  //       console.log(response);
  //       this.isPlaylistVisible = true;
  //       this.router.navigate(['/playlist', this.newPlaylistID]);
  //     },
  //     error: (error) => {
  //       console.error('Error saving playlist into database: ', error);
  //     },
  //     complete: () => {
  //       console.log('Save playlist request completed');
  //     }
  //   });
  // }

  loadPlaylists() {
    this.ownerIdentifier = this.storageService.getItem('identifier') ?? '';
    if (!this.ownerIdentifier) {
      console.error('Identifier is not available in session storage.');
      return;
    }
    this.databaseService.getUserID(this.ownerIdentifier).subscribe({
      next: (response) => {
        if (response.success && response.userID && response.userID.id) {
          this.ownerID = response.userID.id;
          this.databaseService.loadPlaylists(this.ownerID).subscribe({
            next: (response) => {
              this.playlists = response.playlists;
              if (this.playlists.length > 0) {
                this.isPlaylistVisible = true;
              }
            },
            error: (error) => {
              console.error("Error loading playlists: ", error);
            }
          });
        } else {
          console.error('Failed to fetch user ID or user ID is missing in the response');
        }
      },
      error: (error) => {
        console.error('Error retrieving user ID: ', error);
      },
      complete: () => {
        console.log('User ID retrieval completed');
      }
    });
  }
}