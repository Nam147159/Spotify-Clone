import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatabaseService } from '../database-service/database.service';
import { DBPlaylist } from '../../app/models/spotify.model';
import { StorageService } from '../storage-service/storage.service';


const createPlaylistEndpoint = `${environment.apiUrl}/api/spotify/create-playlist`;
const getTrackFromSpotifyEndPoint = `${environment.apiUrl}/api/spotify/playlist/get/track`;
const getArtistTopTracksEndPoint = `${environment.apiUrl}/api/spotify/artist/get-top-tracks`;


@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlistSubject = new BehaviorSubject<any>(null);
  playlist$ = this.playlistSubject.asObservable();

  private playlistChangeSignal = signal<any>(null);

  private playlistUpdatedSubject = new BehaviorSubject<any>(null);
  playlistUpdated$ = this.playlistUpdatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
  private storageService: StorageService) { }

  createNewPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, description, public: isPublic };
    return this.http.post(createPlaylistEndpoint, body, { headers });
  }

  // updatePlaylist(id: string, name: string, description: string) {
  //   console.log('Updating playlist in service:', name);
  //   this.playlistSubject.next({ id, name, description });
  // }

  getPlaylistSignal(): Signal<any> {
    return this.playlistChangeSignal.asReadonly();
  }

  updatePlaylistSignal(id: string, name: string, description: string) {
    console.log('Updating playlist signal:', name);
    this.playlistChangeSignal.set({ id, name, description });
    this.reloadPlaylists();
  }

  notifyPlaylistUpdated() {
    this.playlistUpdatedSubject.next(null);
  }

  private reloadPlaylists() {
    const ownerIdentifier = this.storageService.getItem('identifier');
    if (!ownerIdentifier) {
      console.error('No owner identifier found');
      return;
    }

    this.databaseService.getUserID(ownerIdentifier).pipe(
      switchMap(response => {
        if (response.success && response.userID?.id) {
          return this.databaseService.loadPlaylists(response.userID.id);
        }
        throw new Error('Failed to get user ID');
      })
    ).subscribe({
      next: (response) => {
        if (response.playlists) {
          this.playlistSubject.next(response.playlists);
        }
      },
      error: (error) => {
        console.error('Error reloading playlists:', error);
      }
    });
  }

  getTrackFromSpotify(playlistID: string): Observable<any> {
    const params = new HttpParams().set('playlist_id', playlistID);
    return this.http.get(getTrackFromSpotifyEndPoint, { params });
  }

  getTrackFromArtist(artistID: string): Observable<any> {
    const params = new HttpParams().set('artistID', artistID);
    return this.http.get(getArtistTopTracksEndPoint, { params });
  }

}
