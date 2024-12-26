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
  private interval: any;

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
          cb(token);
        },
        volume: 0.5
      });


      // Ready
      this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        this.deviceID = device_id; // Lưu deviceId vào PlayerService
        this.deviceIdSubject.next(device_id);
        this.updatePlayerState({
          isConnected: true,
          error: null
        });
      });

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        this.deviceID = null;  // Xóa deviceId nếu device đi offline
        this.deviceIdSubject.next(null);
        this.updatePlayerState({
          isConnected: false,
          error: 'Device went offline'
        });
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

          if (!state.paused) {
            this.startUpdatingPosition();
          } else {
            this.stopUpdatingPosition();
          }
        }
      });


      // Connect to the player
      this.player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });

    };
  }

  private startUpdatingPosition() {
    this.stopUpdatingPosition(); // Clear any existing interval
    this.interval = setInterval(() => {
      this.player.getCurrentState().then(state => {
        if (state) {
          this.ngZone.run(() => {
            this.updatePlayerState({
              position: state.position
            });
          });
        }
      });
    }, 1000); // Update every second
  }

  private stopUpdatingPosition() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
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
      if (this.player) {
        const state = await this.player.getCurrentState();
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }

        if (state.paused) {
          await this.player.resume();
        } else {
          await this.player.pause();
        }
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  }

  public async seek(position_ms: number): Promise<void> {
    try {
      if (this.player) {
        await this.player.seek(position_ms);
      }
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }

  public async previousTrack(): Promise<void> {
    try {
      if (this.player) {
        await this.player.previousTrack();
      }
    } catch (error) {
      console.error('Error playing previous track:', error);
    }
  }

  public async nextTrack(): Promise<void> {
    try {
      if (this.player) {
        await this.player.nextTrack();
      }
    } catch (error) {
      console.error('Error playing next track:', error);
    }
  }

  public async setVolume(volume: number): Promise<void> {
    try {
      if (this.player) {
        await this.player.setVolume(volume);
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  public disconnect(): void {
    if (this.player) {
      this.player.disconnect();
    }
  }

  private updatePlayerState(partialState: Partial<PlayerState>): void {
    this.playerStateSubject.next({
      ...this.playerStateSubject.getValue(),
      ...partialState
    });
  }
}
