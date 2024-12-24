import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'http://localhost:2204/api/spotify/get-access-token';

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {
    return this.http.get<string>(this.apiUrl);
  }
}