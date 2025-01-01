import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from '../../services/track-service/track.service';
import {Album, Track} from '../models/spotify.model';
import { TrackCardComponent } from "../shared/track/track.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-albumn-info',
  standalone: true,
  imports: [TrackCardComponent, NgForOf],
  templateUrl: './albumn-info.component.html',
  styleUrl: './albumn-info.component.scss'
})
export class AlbumnInfoComponent implements OnInit {
  popularAlbums: Album[] = [];
  tracks: Track[] = [];
  errorMessage: string = '';
  albumID: string = '';
  albumImageUrl: string = '';
  artistName: string = '';
  albumName: string = '';
  trackTotalDuration: string = '00 min 00 sec';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackService: TrackService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.albumID = params.get('id') ?? '';

      console.log("ALBUM ID: ", this.albumID);
      this.fetchAlbumDetails(this.albumID);
      this.fetchPopularAlbums();

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
        this.getTrackTotalDuration(this.tracks);
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

  fetchPopularAlbums(): void {
    this.trackService.getPopularAlbums().subscribe({
      next: (response: { success: boolean; message: string; data: Album[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularAlbums = response.data;
          this.popularAlbums = this.popularAlbums.filter(album => album && album.name && album.artists && album.images && album.images.length > 0);
          this.getAlbumData();
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular albums:', error);
      },
      complete: () => {
        console.log('Popular albums fetch complete');
      }
    });
  }

  getAlbumData(): void {
    for (let album of this.popularAlbums) {
      if (this.albumID === album.id) {
        this.albumImageUrl = album.images[0].url;
        this.artistName = album.artists.map(artist => artist.name).join(', ');
        this.albumName = album.name;
      }
    }
  }

  getTrackTotalDuration(tracks: Track[]): void {
    let totalDuration: number = 0;
    for (let track of tracks) {
      totalDuration += track.duration_ms;
    }
    let minutes = Math.floor(totalDuration / 60000);
    let seconds = ((totalDuration % 60000) / 1000).toFixed(0);
    this.trackTotalDuration = minutes + " min " + (+seconds < 10 ? '0' : '') + seconds + " sec";
  }

  onClick() {

  }
}
