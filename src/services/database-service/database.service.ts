import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Playlist } from '../../app/models/spotify.model';

const getUserIDEndpoint = `${environment.apiUrl}/api/database/get-user-id`;
const saveNewPlaylistEndpoint = `${environment.apiUrl}/api/database/save-new-playlist`;
const loadPlaylistsEndpoint = `${environment.apiUrl}/api/database/get-playlists`;
const getPlaylistByIdEndpoint = `${environment.apiUrl}/api/database/get-playlist-by-id`;
const changePlaylistNameEndPoint = `${environment.apiUrl}/api/database/change-playlist-name`;
const addTrackToPlaylistEndpoint = `${environment.apiUrl}/api/database/add-track-to-playlist`;
const getTracksInPlaylistEndpoint = `${environment.apiUrl}/api/database/get-tracks-in-playlist`;
const deleteTrackInPlaylistEndpoint = `${environment.apiUrl}/api/database/delete-track-in-playlist`;

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  getUserID(identifier: string): Observable<any> {
    const params = new HttpParams().set('username', identifier);
    return this.http.get(getUserIDEndpoint, { params });
  }

  saveNewPlaylist(
    playlistID: string,
    ownerID: string,
    playlistName: string,
    description: string,
    isPublic: boolean,
  ): Observable<any> {
    return this.http.post(saveNewPlaylistEndpoint, {
      playlistID,
      ownerID,
      playlistName,
      description,
      isPublic,
    });
  }

  loadPlaylists(ownerID: string): Observable<any> {
    const params = new HttpParams().set('ownerID', ownerID);
    return this.http.get(loadPlaylistsEndpoint, { params });
  }

  getPlaylistById(playlistID: string): Observable<any> {
    const params = new HttpParams().set('playlistID', playlistID);
    return this.http.get(getPlaylistByIdEndpoint, { params });
  }

  changePlaylistName(playlistID: string, newName: string): Observable<any> {
    return this.http.put(changePlaylistNameEndPoint, { playlistID, newName });
  }

  addTrackToPlaylist(playlistID: string, trackID: string): Observable<any> {
    return this.http.post(addTrackToPlaylistEndpoint, { playlistID, trackID });
  }

  getTracksInPlaylist(playlistID: string): Observable<any> {
    const params = new HttpParams().set('playlistID', playlistID);
    return this.http.get(getTracksInPlaylistEndpoint, { params });
  }

  deletePlaylist(playlistID: string, trackID: string): Observable<any> {
    const body = { playlistID, trackID };
    return this.http.delete(deleteTrackInPlaylistEndpoint, { body });
  }
}
