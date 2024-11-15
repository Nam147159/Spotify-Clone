import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Album, Artist } from '../../app/models/spotify.model';

const albumEndpoint = `${environment.apiUrl}/api/spotify/recommendation/album`;
const artistEndpoint = `${environment.apiUrl}/api/spotify/recommendation/artist`;
const playlistEndpoint = `${environment.apiUrl}/api/spotify/recommendation/playlist`;

@Injectable({
  providedIn: 'root'
})
export class MainPanelService {
  constructor(private http: HttpClient) { }

  getPopularAlbums(): Observable<any> {
    return this.http.get<Album[]>(albumEndpoint);
  }

  getPopularArtists(): Observable<any> {
    return this.http.get<Artist[]>(artistEndpoint);
  } 
}
