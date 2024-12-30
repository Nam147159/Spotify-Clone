import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const getUserIDEndpoint = `${environment.apiUrl}/api/database/get-user-id`;
const saveNewPlaylistEndpoint = `${environment.apiUrl}/api/database/save-new-playlist`;
const loadPlaylistsEndpoint = `${environment.apiUrl}/api/database/get-playlists`;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getUserID(identifier: string): Observable<any> {
    const params = new HttpParams().set('username', identifier);
    return this.http.get(getUserIDEndpoint, { params });
  }

  saveNewPlaylist(playlistID: string, ownerID: string, playlistName: string, description: string, isPublic: boolean): Observable<any> {
    return this.http.post(saveNewPlaylistEndpoint, { playlistID, ownerID, playlistName, description, isPublic });
  }

  loadPlaylists(ownerID: string): Observable<any> {
    const params = new HttpParams().set('ownerID', ownerID);
    return this.http.get(loadPlaylistsEndpoint, { params });
  }

}
