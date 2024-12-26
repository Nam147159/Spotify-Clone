import { SliderModule } from 'primeng/slider';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player-service/player.service';
import { Track } from '../models/spotify.model';
import { TokenService } from '../../services/token-service/token.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SliderModule, ButtonModule, ProgressBarModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  private accessToken: string = "";
  currentTrack: Track | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;

  constructor(private playerService: PlayerService, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.getAccessToken().subscribe({
      next: (response) => {
        this.accessToken = response.token;  // Lưu token
        this.playerService.initializePlayer(this.accessToken);  // Khởi tạo player với token
      },
      error: (error) => {
        console.error('Error fetching token:', error);  // Xử lý lỗi nếu có
      },
      complete: () => {
        console.log('Token request complete');  // Thực thi khi hoàn thành stream
      }
    });

    this.playerService.playerState$.subscribe(state => {
      this.currentTrack = state.currentTrack;
      this.isPlaying = state.isPlaying;
      this.currentTime = state.position;
      this.duration = state.duration;

      // console.log('Current Time:', this.currentTime);
    });

    
  }

  togglePlay() {
    this.playerService.togglePlay();
  }

  next() {
    this.playerService.nextTrack();
  }

  previous() {
    this.playerService.previousTrack();
  }
}
