import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const getTracksInAlbumEndpoint = `${environment.apiUrl}/api/spotify/album/get/track`;

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getTracksFromAlbum(id: string): Observable<any> {
    const params = new HttpParams().set('album_id', id);
    return this.http.get(`${getTracksInAlbumEndpoint}`, { params });
  }
}
