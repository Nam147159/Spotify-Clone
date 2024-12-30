import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatabaseService } from '../database-service/database.service';

interface Music {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  genre: string;
  dateAdded?: Date;
}
interface Playlist {
  id: number;
  title: string;
  cover?: string;
  description?: string;
  creator: string;
  musicList?: Music[];
  lastModifiedDate?: Date;
}

const createPlaylistEndpoint = `${environment.apiUrl}/api/spotify/create-playlist`;

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService) { }

  createNewPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, description, public: isPublic };
    return this.http.post(createPlaylistEndpoint, body, { headers });
  }

}
