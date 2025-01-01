import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Album } from '../../app/models/spotify.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private readonly http: HttpClient) {}

  search(query: string): Observable<any> {
    const params = new HttpParams().set('info', query);
    return this.http.get<any>(`${this.apiUrl}/api/spotify/search`, { params });
  }
}
