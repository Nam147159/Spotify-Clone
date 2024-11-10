import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'album-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss'
})
export class AlbumCardComponent {
  isHovered: boolean = false;

  onHover(isHovered: boolean): void {
    this.isHovered = isHovered;
  }

  @Input() album: { name: string; image: string; artistNames: string; } = {
    name: '',
    image: '',
    artistNames: '',
  }; 
}
