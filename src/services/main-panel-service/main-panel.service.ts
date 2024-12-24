import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { Album, Artist, Playlist } from '../../app/models/spotify.model';

const albumEndpoint = `${environment.apiUrl}/api/spotify/recommendation/album`;
const artistEndpoint = `${environment.apiUrl}/api/spotify/recommendation/artist`;
const playlistEndpoint = `${environment.apiUrl}/api/spotify/recommendation/playlist`;
const top100PlaylistsEndPoint = `${environment.apiUrl}/api/spotify/recommendation/top100`;


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
  getRecommendedPlaylists(): Observable<any> {
    return this.http.get<Playlist[]>(playlistEndpoint);
  }
  getTop100Playlists(): Observable<{ success: boolean; message: string; data: Playlist[] }> {
    return this.http.get<{ success: boolean; message: string; data: Playlist[] }>(`${top100PlaylistsEndPoint}`)
      .pipe(
        timeout(30000), // Increase timeout to 30 seconds
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
