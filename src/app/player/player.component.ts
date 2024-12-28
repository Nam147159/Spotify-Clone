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

  constructor(private readonly playerService: PlayerService, private ngZone: NgZone) {}

  ngOnInit() {
    this.playerService.playerState$.subscribe((state) => {
      this.ngZone.run(() => {
        this.currentTrack = state.currentTrack;
        this.isPlaying = state.isPlaying;
        this.currentTime = state.position;
        this.duration = state.duration;
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
}
