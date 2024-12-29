import { Inject, Injectable, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
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
  providedIn: 'root',
})
export class PlayerService {
  player!: Spotify.Player;
  private deviceID: string | null = null;
  private token: string | null = null;

  public playerState$ = new BehaviorSubject<PlayerState>({
    isConnected: false,
    isPlaying: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    error: null,
  });

  private deviceId$ = new BehaviorSubject<string | null>(null);
  private interval: any;

  constructor(
    private tokenService: TokenService,
    private ngZone: NgZone,
  ) {}

  setupPlayer(token: string): void {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      // Ready
      this.player.addListener(
        'ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Ready with Device ID', device_id);
          this.deviceID = device_id; // Lưu deviceId vào PlayerService
          this.deviceId$.next(device_id);
          this.updatePlayerState({
            isConnected: true,
            error: null,
          });
        },
      );

      // Not Ready
      this.player.addListener(
        'not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
          this.deviceID = null; // Xóa deviceId nếu device đi offline
          this.deviceId$.next(null);
          this.updatePlayerState({
            isConnected: false,
            error: 'Device went offline',
          });
        },
      );

      // Error handling
      this.player.addListener(
        'initialization_error',
        ({ message }: { message: string }) => {
          console.error('Initialization Error:', message);
        },
      );
      this.player.addListener(
        'authentication_error',
        ({ message }: { message: string }) => {
          console.error('Authentication Error:', message);
        },
      );

      this.player.addListener(
        'account_error',
        ({ message }: { message: string }) => {
          console.error('Account Error:', message);
        },
      );

      this.player.addListener(
        'player_state_changed',
        (state: Spotify.PlaybackState | null) => {
          if (!state) {
            return;
          }
          console.log('Player state changed', state);
          this.updatePlayerState({
            isPlaying: !state.paused,
            currentTrack: state.track_window.current_track,
            position: state.position,
            duration: state.duration,
            error: null,
          });

          if (!state.paused) {
            this.startUpdatingPosition();
          } else {
            this.stopUpdatingPosition();
          }
        },
      );

      // Connect to the player
      this.player.connect().then((success) => {
        if (success) {
          console.log(
            'The Web Playback SDK successfully connected to Spotify!',
          );
        }
      });
    };
  }

  init() {
    this.tokenService.getAccessToken().subscribe((token) => {
      this.token = token.token;
      if (typeof document !== 'undefined') {
        const script = document.createElement('script');
        script.id = 'spotify-player';
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = false;
        script.onload = () => {
          this.setupPlayer(token.token);
        };
        document.body.appendChild(script);
      } else {
        console.error('Document is not defined.');
      }
    });
  }

  private startUpdatingPosition() {
    this.stopUpdatingPosition(); // Clear any existing interval
    this.interval = setInterval(() => {
      this.forceUpdateState();
    }, 1000); // Update every second
  }

  private stopUpdatingPosition() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  public async setTracks(
    trackIds: string[],
    offset: { position: number } | { uri: string } | undefined = undefined,
    position_ms: number = 0,
  ): Promise<void> {
    if (!this.deviceID) {
      return;
    }
    const tracks = trackIds.map((id) => `spotify:track:${id}`);

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: tracks,
          offset: offset,
          position_ms: position_ms,
        }),
      },
    );

    if (response.status === 204) {
      console.log('Track is playing (No content response)');
      return;
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
      });
      throw new Error(`Failed to play track: ${response.statusText}`);
    }

    const data = await response.json();
    if (!response.ok) {
      console.error('Error playing track:', data);
    } else {
      console.log('Track is playing:', data);
    }
    this.forceUpdateState();
  }

  public async setAlbum(
    albumId: string,
    offset: { position: number } | { uri: string } | undefined = undefined,
    position_ms: number = 0,
  ) {
    if (!this.deviceID) {
      return;
    }
    const album = `spotify:album:${albumId}`;
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_uri: album,
          offset: offset,
          position_ms: position_ms,
        }),
      },
    );

    if (response.status === 204) {
      console.log('Album is playing (No content response)');
      return;
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
      });
      throw new Error(`Failed to play album: ${response.statusText}`);
    }

    const data = await response.json();
    if (!response.ok) {
      console.error('Error playing album:', data);
    } else {
      console.log('Album is playing:', data);
    }
    this.forceUpdateState();
  }

  public getDeviceId(): Observable<string | null> {
    return this.deviceId$.asObservable();
  }

  public isPlayerReady(): boolean {
    return this.player !== null && this.deviceID !== null;
  }

  // Additional methods to control playback
  public async togglePlay(): Promise<void> {
    await this.player.togglePlay();
  }

  public async seek(position_ms: number): Promise<void> {
    try {
      await this.player.seek(position_ms);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }

  public async previousTrack(): Promise<void> {
    try {
      await this.player.previousTrack();
    } catch (error) {
      console.error('Error playing previous track:', error);
    }
  }

  public async nextTrack(): Promise<void> {
    try {
      await this.player.nextTrack();
    } catch (error) {
      console.error('Error playing next track:', error);
    }
  }

  public async setVolume(volume: number): Promise<void> {
    try {
      await this.player.setVolume(volume);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  public disconnect(): void {
    this.player.disconnect();
  }

  private async forceUpdateState(): Promise<void> {
    const state = await this.player.getCurrentState();
    if (!state) {
      return;
    }
    this.updatePlayerState({
      isPlaying: !state.paused,
      currentTrack: state.track_window.current_track,
      position: state.position,
      duration: state.duration,
      error: null,
    });
  }

  private updatePlayerState(partialState: Partial<PlayerState>): void {
    this.playerState$.next({
      ...this.playerState$.getValue(),
      ...partialState,
    });
  }
}
