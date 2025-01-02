import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Album} from "../../app/models/spotify.model";

const getTracksInAlbumEndpoint = `${environment.apiUrl}/api/spotify/album/get/track`;
const albumEndpoint = `${environment.apiUrl}/api/spotify/recommendation/album`;
const getTrackInfoEndpoint = `${environment.apiUrl}/api/spotify/get-track`;

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getTracksFromAlbum(id: string): Observable<any> {
    const params = new HttpParams().set('album_id', id);
    return this.http.get(`${getTracksInAlbumEndpoint}`, { params });
  }

  getPopularAlbums(): Observable<any> {
    return this.http.get<Album[]>(albumEndpoint);
  }

  getTrack(id: string): Observable<any> {
    const params = new HttpParams().set('trackID', id);
    return this.http.get(getTrackInfoEndpoint, { params });
  }
}
