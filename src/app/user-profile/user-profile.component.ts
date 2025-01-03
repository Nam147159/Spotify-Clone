import { StorageService } from './../../services/storage-service/storage.service';
import { Component, OnInit } from "@angular/core";
import { AlbumCardComponent } from "../shared/album-card/album-card.component";
import { Album } from "../models/spotify.model";
import { MainPanelService } from "../../services/main-panel-service/main-panel.service";
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { LibraryPanelService } from '../../services/library-panel-service/library-panel.service';

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [AlbumCardComponent],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss",
})
export class UserProfileComponent implements OnInit {
  albums!: Album[];
  username!: string;

  ngOnInit(): void {
    this.loadAlbums();
    this.loadUser();
  }

  constructor(
    private mainPanelService: MainPanelService,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private libraryPanelService: LibraryPanelService) { }

  loadUser() {
    this.username = this.storageService.getItem('identifier') ?? 'Username'
  }

  loadAlbums(): void {
    this.mainPanelService.getPopularAlbums().subscribe({
      next: (response: {
        success: boolean;
        message: string;
        data: Album[];
      }) => {
        if (response.success && Array.isArray(response.data)) {
          this.albums = response.data;
        } else {
          console.error("Invalid data structure:", response);
        }
      },
      error: (error) => {
        console.error("Error fetching popular albums:", error);
      },
      complete: () => {
        console.log("Popular albums fetch complete");
      },
    });
  }

  logOut() {
    this.authenticationService.logout();
    this.storageService.removeItem('identifier');
    this.libraryPanelService.setPlaylistVisibility(false);
    this.router.navigate(['/']);
  }
}
