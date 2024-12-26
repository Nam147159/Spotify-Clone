interface Window {
  Spotify: typeof Spotify;
  onSpotifyWebPlaybackSDKReady: () => void;
}


declare namespace Spotify {
  interface Player {
    connect(): Promise<boolean>;
    disconnect(): void;
    addListener(event: string, callback: Function): void;
    removeListener(event: string, callback: Function): void;
    getCurrentState(): Promise<PlaybackState | null>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    seek(position_ms: number): Promise<void>;
    previousTrack(): Promise<void>;
    nextTrack(): Promise<void>;
  }

  interface PlaybackState {
    context: {
      uri: string;
      metadata: any;
    };
    disallows: {
      pausing: boolean;
      // peeking_next: boolean;
      // peeking_prev: boolean;
      resuming: boolean;
      seeking: boolean;
      skipping_next: boolean;
      skipping_prev: boolean;
    };
    duration: number;
    paused: boolean;
    position: number;
    repeat_mode: number;
    shuffle: boolean;
    track_window: {
      current_track: Track;
      next_tracks: Track[];
      previous_tracks: Track[];
    };
  }

  interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }

  interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }

  interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    followers?: {
      href: string | null;
      total: number;
    };
    genres?: string[];
    images?: Image[];
    popularity?: number;
  }

  interface ExternalUrls {
    spotify: string;
  }

  interface Image {
    height: number;
    url: string;
    width: number;
  }
}