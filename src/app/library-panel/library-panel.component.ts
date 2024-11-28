import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  selector: 'app-library-panel',
  standalone: true,
  imports: [PlaylistComponent],
  templateUrl: './library-panel.component.html',
  styleUrl: './library-panel.component.scss',
})
export class LibraryPanelComponent {
  showTooltip: boolean = false;
  playlist = 0;

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    this.playlist += 1;
  }
}
