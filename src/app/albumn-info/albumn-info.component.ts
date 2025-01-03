import { MainPanelService } from './../../services/main-panel-service/main-panel.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from '../../services/track-service/track.service';
import { Album, Artist, Playlist, Track } from '../models/spotify.model';
import { TrackCardComponent } from "../shared/track/track.component";
import { NgForOf } from "@angular/common";
import { PlaylistService } from '../../services/playlist-service/playlist.service';

@Component({
  selector: 'app-albumn-info',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './albumn-info.component.html',
  styleUrl: './albumn-info.component.scss'
})
export class AlbumnInfoComponent implements OnInit {
  popularAlbums: Album[] = [];
  tracks: Track[] = [];
  top100: Playlist[] = [];
  recommend: Playlist[] = [];
  popularArtists: Artist[] = [];
  errorMessage: string = '';
  albumID: string = '';
  playlistID: string = '';
  artistID: string = '';
  albumImageUrl: string = '';
  artistName: string = '';
  albumName: string = '';
  trackTotalDuration: string = '00 min 00 sec';
  playingTrackIds: string[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackService: TrackService,
    private playlistService: PlaylistService,
    private mainPanelService: MainPanelService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id') ?? '';
      const url = this.router.url;

      if (url.startsWith('/album/')) {
        this.albumID = id;
        this.fetchAlbumDetails(this.albumID);
        this.fetchPopularAlbums();
      } else if (url.startsWith('/top100/')) {
        this.playlistID = id;
        this.fetchTop100Details(this.playlistID);
        this.getTop100Data();
      } else if (url.startsWith('/recommendplaylist/')) {
        this.playlistID = id;
        this.fetchRecommenDetail(this.playlistID);
        this.getRecommenData();
      } else {
        this.artistID = id;
        this.fetchArtistDetails(this.artistID);
        this.getArtistData();
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Sử dụng Router để quay lại
  }

  fetchAlbumDetails(albumID: string) {
    this.trackService.getTracksFromAlbum(albumID).subscribe({
      next: (response) => {
        this.tracks = response.data; // Gán dữ liệu vào biến `tracks`
        this.playingTrackIds = this.tracks.map(track => track.id);
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

  getTop100Data(): void {
    this.mainPanelService.getTop100Playlists().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.top100 = response.data;

          //Filter data that has name, description, and images
          this.top100 = this.top100.filter(
            (playlist) =>
              playlist &&
              playlist.name &&
              playlist.description &&
              playlist.images &&
              playlist.images.length > 0,
          );

          for (let playlist of this.top100) {
            if (this.playlistID === playlist.id) {
              this.albumImageUrl = playlist.images[0].url;
              this.artistName = "Various Artists";
              this.albumName = playlist.name ?? '';
            }
          }
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching top 100 playlists:', error);
      },
      complete: () => {
        console.log('Top 100 playlists fetch complete');
      },
    });
  }

  getRecommenData() {
    this.mainPanelService.getRecommendedPlaylists().subscribe({
      next: (response) => {
        console.log("Response: ", response);
        if (response.success && Array.isArray(response.data)) {

          this.recommend = response.data;

          this.recommend = this.recommend.filter(
            (playlist) =>
              playlist &&
              playlist.name &&
              playlist.description &&
              playlist.images &&
              playlist.images.length > 0,
          );

          for (let playlist of this.recommend) {
            if (this.playlistID === playlist.id) {
              this.albumImageUrl = playlist.images[0].url;
              this.artistName = "Various Artists";
              this.albumName = playlist.name ?? '';
            }
          }
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching top 100 playlists:', error);
      },
      complete: () => {
        console.log('Top 100 playlists fetch complete');
      },
    });
  }

  fetchRecommenDetail(playlistID: string) {
    this.playlistService.getTrackFromSpotify(playlistID).subscribe({
      next: (response) => {
        this.tracks = response.data.map((item: any) => this.mapToTrack(item.track));
        this.playingTrackIds = this.tracks.map(t => t.id);
        this.getTrackTotalDuration(this.tracks);
      },
      error: (error) => {
        console.error('Error fetching tracks:', error);
        this.errorMessage = 'Unable to fetch tracks. Please try again later.';
      },
      complete() {
        console.log("Fetch playlist detail complete");
      }
    });
  }

  fetchArtistDetails(artistID: string) {
    this.playlistService.getTrackFromArtist(artistID).subscribe({
      next: (response) => {
        this.tracks = response.data.tracks;
        this.playingTrackIds = this.tracks.map(track => track.id);
        console.log("Response: ", this.tracks);
        this.getTrackTotalDuration(this.tracks);
      },
      error: (error) => {
        console.error('Error fetching tracks:', error);
        this.errorMessage = 'Unable to fetch tracks. Please try again later.';
      },
      complete() {
        console.log("Fetch artist detail complete");
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

  getArtistData() {
    this.mainPanelService.getPopularArtists().subscribe({
      next: (response) => {
        console.log("Response: ", response);
        if (response.success && Array.isArray(response.data)) {
          this.popularArtists = response.data;

          this.popularArtists = this.popularArtists.filter(
            (artist) =>
              artist.name &&
              artist.type &&
              artist.images &&
              artist.images.length > 0,
          );

          for (let artist of this.popularArtists) {
            if (this.artistID === artist.id) {
              this.albumImageUrl = artist.images && artist.images.length > 0 ? artist.images[0].url : '';
              this.artistName = artist.name;
              this.albumName = 'Top Tracks';
            }
          }
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular artists:', error);
      },
      complete: () => {
        console.log('Popular artists fetch complete');
      },
    })
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

  fetchTop100Details(playlistID: string) {
    this.playlistService.getTrackFromSpotify(playlistID).subscribe({
      next: (response) => {
        this.tracks = response.data.map((item: any) => this.mapToTrack(item.track));
        this.playingTrackIds = this.tracks.map(t => t.id);
        this.getTrackTotalDuration(this.tracks);
      },
      error: (error) => {
        console.error('Error fetching tracks:', error);
        this.errorMessage = 'Unable to fetch tracks. Please try again later.';
      },
      complete() {
        console.log("Fetch playlist detail complete");
      }
    });
  }

  private mapToTrack(trackData: any): Track {
    return {
      album: trackData.album,
      artists: trackData.artists,
      available_markets: trackData.available_markets,
      disc_number: trackData.disc_number,
      duration_ms: trackData.duration_ms,
      explicit: trackData.explicit,
      external_ids: trackData.external_ids,
      external_urls: trackData.external_urls,
      href: trackData.href,
      id: trackData.id,
      is_playable: trackData.is_playable,
      linked_from: trackData.linked_from,
      name: trackData.name,
      popularity: trackData.popularity,
      preview_url: trackData.preview_url,
      track_number: trackData.track_number,
      type: trackData.type,
      uri: trackData.uri,
      is_local: trackData.is_local
    };
  }


}
