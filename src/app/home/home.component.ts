import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LibraryPanelComponent } from "../library-panel/library-panel.component";
import { MainPanelComponent } from "../main-panel/main-panel.component";
import { SignUpBarComponent } from "../sign-up-bar/sign-up-bar.component";
import { BrowsePanelComponent } from "../browse-panel/browse-panel.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, LibraryPanelComponent, MainPanelComponent, SignUpBarComponent, BrowsePanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
