import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TokenService } from '../token-service/token.service';


interface PlayerState {
  isConnected: boolean;
  isPlaying: boolean;
  currentTrack: Spotify.Track | null;
  position: number;
  duration: number;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player!: Spotify.Player;
  public deviceID: string | null = null;
  private playerStateSubject = new BehaviorSubject<PlayerState>({
    isConnected: false,
    isPlaying: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    error: null
  });
  private deviceIdSubject = new BehaviorSubject<string | null>(null);

  public playerState$ = this.playerStateSubject.asObservable();

  constructor(private ngZone: NgZone, private tokenService: TokenService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      window.onSpotifyWebPlaybackSDKReady = () => { };
    }
  }

  initializePlayer(token: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!document.getElementById('spotify-player')) {
      const script = document.createElement('script');
      script.id = 'spotify-player';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK Player',
        getOAuthToken: (cb: (token: string) => void) => {
          this.tokenService.getAccessToken().subscribe(
            (response) => {
              cb(response.token);
            },
            (error) => {
              console.error('Error getting token:', error);
            }
          );
        },
        volume: 0.5
      });



      // Ready
      this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        this.deviceID = device_id; // Lưu deviceId vào PlayerService
        this.deviceIdSubject.next(device_id);
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        this.deviceID = null;  // Xóa deviceId nếu device đi offline
        this.deviceIdSubject.next(null);
      });

      // Error handling
      this.player.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error('Initialization Error:', message);
      });
      this.player.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error('Authentication Error:', message);
      });
      this.player.addListener('account_error', ({ message }: { message: string }) => {
        console.error('Account Error:', message);
      });

      this.player.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
        if (state) {
          this.ngZone.run(() => {
            this.updatePlayerState({
              isPlaying: !state.paused,
              currentTrack: state.track_window.current_track,
              position: state.position,
              duration: state.duration,
              error: null
            });
          });
        }
      });

      // Ready
      this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        this.updatePlayerState({
          isConnected: true,
          error: null
        });
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        this.updatePlayerState({
          isConnected: false,
          error: 'Device went offline'
        });
      });

      // Connect to the player
      this.player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });

    };
  }

  public getDeviceId(): Observable<string | null> {
    return this.deviceIdSubject.asObservable();
  }

  public isPlayerReady(): boolean {
    return this.player !== null && this.deviceID !== null;
  }

  // Additional methods to control playback
  public async togglePlay(): Promise<void> {
    try {
      await this.player.togglePlay();
    } catch (error) {
      this.updatePlayerState({
        error: 'Failed to toggle playback'
      });
    }
  }

  public async seek(position_ms: number): Promise<void> {
    try {
      await this.player.seek(position_ms);
    } catch (error) {
      this.updatePlayerState({
        error: 'Failed to seek'
      });
    }
  }

  public async previousTrack(): Promise<void> {
    try {
      await this.player.previousTrack();
    } catch (error) {
      this.updatePlayerState({
        error: 'Failed to skip to previous track'
      });
    }
  }

  public async nextTrack(): Promise<void> {
    try {
      await this.player.nextTrack();
    } catch (error) {
      this.updatePlayerState({
        error: 'Failed to skip to next track'
      });
    }
  }

  public async setVolume(volume: number): Promise<void> {
    try {
      await this.player.setVolume(Math.min(1, Math.max(0, volume)));
    } catch (error) {
      this.updatePlayerState({
        error: 'Failed to set volume'
      });
    }
  }

  public disconnect(): void {
    if (this.player) {
      this.player.disconnect();
      this.updatePlayerState({
        isConnected: false,
        isPlaying: false,
        currentTrack: null,
        position: 0,
        duration: 0,
        error: null
      });
    }
  }

  private updatePlayerState(partialState: Partial<PlayerState>): void {
    this.playerStateSubject.next({
      ...this.playerStateSubject.getValue(),
      ...partialState
    });
  }
}
