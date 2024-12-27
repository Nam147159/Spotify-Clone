import { Component, OnInit } from "@angular/core";
import { AlbumCardComponent } from "../shared/album-card/album-card.component";
import { Album } from "../models/spotify.model";
import { MainPanelService } from "../../services/main-panel-service/main-panel.service";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [AlbumCardComponent],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss",
})
export class UserProfileComponent implements OnInit {
  albums!: Album[];

  ngOnInit(): void {
    this.loadAlbums();
  }

  constructor(private mainPanelService: MainPanelService) {}

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
}
