import { SliderModule } from 'primeng/slider';
import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player-service/player.service';
import { Track } from '../models/spotify.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    SliderModule,
    ButtonModule,
    ProgressBarModule,
    FormsModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  currentTrack: Track | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 50;
  volumeValue: number = 50;
  isMuted: boolean = false;

  interval: any;
  latestChange: number = 1;

  constructor(
    private readonly playerService: PlayerService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.playerService.playerState$.subscribe((state) => {
      this.ngZone.run(() => {
        this.currentTrack = state.currentTrack;
        this.currentTime = state.position;
        this.duration = state.duration;
        this.isPlaying = state.isPlaying;
      });
    });
  }

  async togglePlay() {
    console.log('Toggled play');
    await this.playerService.togglePlay();
  }

  async next() {
    console.log('Next track');
    await this.playerService.nextTrack();
  }

  async previous() {
    console.log('previous track');
    await this.playerService.previousTrack();
  }

  async setVolume(volume: number) {
    console.log('Set volume');
    this.volume = volume;
    this.volumeValue = volume;
    await this.playerService.setVolume(volume / 100);
  }

  async seek(time: number) {
    console.log('Seek');
    await this.playerService.seek(time);
  }

  async toggleMute() {
    console.log('Toggled mute');
    this.isMuted = !this.isMuted;
    this.volumeValue = this.isMuted ? 0 : this.volume;
    await this.playerService.setVolume(this.isMuted ? 0 : this.volume / 100);
  }
}
