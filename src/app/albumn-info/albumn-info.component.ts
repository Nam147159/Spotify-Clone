import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { TrackService } from '../../services/track-service/track.service';
import { MainPanelComponent } from '../main-panel/main-panel.component';
import { Track } from '../models/spotify.model';
import { TrackCardComponent } from "../shared/track/track.component";

@Component({
  selector: 'app-albumn-info',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './albumn-info.component.html',
  styleUrl: './albumn-info.component.scss'
})
export class AlbumnInfoComponent implements OnInit {
  album: any;

  tracks: Track[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackService: TrackService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const albumID = params.get('id') ?? '';

      console.log("ALBUM ID: ", albumID);

      this.fetchAlbumDetails(albumID);

      // // Nếu album từ navigation state trùng với ID trong URL
      // if (navigationAlbum && navigationAlbum.id === albumId) {
      //   this.album = navigationAlbum;
      // } else {
      //   // Nếu không, có thể gọi service để lấy album
      //   this.fetchAlbumDetails();
      // }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Sử dụng Router để quay lại
  }

  fetchAlbumDetails(albumID: string) {
    this.trackService.getTracksFromAlbum(albumID).subscribe({
      next: (response) => {
        this.tracks = response.data; // Gán dữ liệu vào biến `tracks`
      },
      error: (error) => {
        console.error('Error fetching tracks:', error);
        this.errorMessage = 'Unable to fetch tracks. Please try again later.';
      },
      complete() {
        console.log("Fetch album detail complete");
      },
    });
  }

  onClick() {

  }
}
