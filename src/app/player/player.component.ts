import { SliderModule } from 'primeng/slider';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SliderModule, ButtonModule, ProgressBarModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {



  track = {
    title: 'Snowman',
    artist: 'Sia',
    albumArt: 'https://via.placeholder.com/120', // Example album art
  };

  progress: number = 0;
  volume: number = 50;
  elapsedTime: number = 65; // Current elapsed time in seconds
  totalTime: number = 165; // Total song time in seconds (2:45)

  playing: boolean = false;
  interval: any;

  playPause() {
    this.playing = !this.playing;
    if (this.playing) {
      this.startProgress();
    } else {
      clearInterval(this.interval);
    }
  }

  startProgress() {
    this.interval = setInterval(() => {
      if (this.elapsedTime < this.totalTime) {
        this.elapsedTime++;
        this.progress = (this.elapsedTime / this.totalTime) * 100;
      } else {
        clearInterval(this.interval);
        this.playing = false;
      }
    }, 1000);
  }

  nextTrack() {
    // Logic to switch to next track
    this.track.title = 'Next Song';
    this.track.artist = 'Next Artist';
    this.elapsedTime = 0;
    this.progress = 0;
  }

  previousTrack() {
    // Logic to switch to previous track
    this.track.title = 'Previous Song';
    this.track.artist = 'Previous Artist';
    this.elapsedTime = 0;
    this.progress = 0;
  }
}
