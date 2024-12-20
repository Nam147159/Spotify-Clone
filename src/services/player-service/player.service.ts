import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// declare global {
//   interface Window {
//     onSpotifyWebPlaybackSDKReady: () => void;
//     Spotify: any;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // private apiUrl = 'http://localhost:2204/api/spotify/get-access-token';
  // // private player: Spotify.Player | null = null;
  // private player: Spotify.Player | null = null;

  // constructor(private http: HttpClient) { }

  // getAccessToken(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  // initializePlayer(token: string) {
  //   const script = document.createElement('script');
  //   script.src = 'https://sdk.scdn.co/spotify-player.js';
  //   script.type = 'text/javascript';
  //   script.addEventListener('load', (e) => {
  //     console.log(e);
  //   });
  //   document.head.appendChild(script);
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     this.player = new Spotify.Player({
  //       name: 'Web Playback SDK Player',
  //       getOAuthToken: (cb: (token: string) => void) => { cb(token); },
  //       volume: 0.5
  //     });

  //     // Ready
  //     this.player.addListener('ready', ({ device_id }) => {
  //       console.log('Ready with Device ID', device_id);
  //     });

  //     // Not Ready
  //     this.player.addListener('not_ready', ({ device_id }) => {
  //       console.log('Device ID has gone offline', device_id);
  //     });

  //     // Error handling
  //     this.player.addListener('initialization_error', ({ message }) => {
  //       console.error('Initialization Error:', message);
  //     });
  //     this.player.addListener('authentication_error', ({ message }) => {
  //       console.error('Authentication Error:', message);
  //     });
  //     this.player.addListener('account_error', ({ message }) => {
  //       console.error('Account Error:', message);
  //     });

  //     // Connect to the player
  //     this.player.connect();
  //   };
  // }

  // // Additional methods to control playback
  // play() {
  //   if (this.player) {
  //     this.player.resume();
  //   }
  // }

  // pause() {
  //   if (this.player) {
  //     this.player.pause();
  //   }
  // }

  // nextTrack() {
  //   if (this.player) {
  //     this.player.nextTrack();
  //   }
  // }

  // previousTrack() {
  //   if (this.player) {
  //     this.player.previousTrack();
  //   }
  // }
}
