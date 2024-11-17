import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-library-panel',
  standalone: true,
  imports: [],
  templateUrl: './library-panel.component.html',
  styleUrl: './library-panel.component.scss',
})
export class LibraryPanelComponent {
  showTooltip: boolean = false;

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }
}
