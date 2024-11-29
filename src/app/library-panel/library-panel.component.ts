import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  selector: 'app-library-panel',
  standalone: true,
  imports: [PlaylistComponent],
  templateUrl: './library-panel.component.html',
  styleUrl: './library-panel.component.scss',
})
export class LibraryPanelComponent {
  @ViewChild(PlaylistComponent) playlistComponent!: PlaylistComponent;
  showTooltip: boolean = false;
  isPlaylistVisible: boolean = false
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    this.isPlaylistVisible = true
    console.log(1)
  }
}


