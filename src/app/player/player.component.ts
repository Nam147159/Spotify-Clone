import { SliderModule } from 'primeng/slider';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player-service/player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SliderModule, ButtonModule, ProgressBarModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  // constructor(private playerService: PlayerService) { }

  // private accessToken: string = "";

  // ngOnInit() {
  //   this.playerService.getAccessToken().subscribe({
  //     next: (response) => {
  //       this.accessToken = response.token;  // Lưu token
  //       this.playerService.initializePlayer(this.accessToken);  // Khởi tạo player với token
  //     },
  //     error: (error) => {
  //       console.error('Error fetching token:', error);  // Xử lý lỗi nếu có
  //     },
  //     complete: () => {
  //       console.log('Token request complete');  // Thực thi khi hoàn thành stream
  //     }
  //   });
  // }

  // play() {
  //   this.playerService.play();
  // }

  // pause() {
  //   this.playerService.pause();
  // }

  // next() {
  //   this.playerService.nextTrack();
  // }

  // previous() {
  //   this.playerService.previousTrack();
  // }
}
