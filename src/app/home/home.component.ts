import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LibraryPanelComponent } from "../library-panel/library-panel.component";
import { MainPanelComponent } from "../main-panel/main-panel.component";
import { SignUpBarComponent } from "../sign-up-bar/sign-up-bar.component";
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, LibraryPanelComponent, MainPanelComponent, SignUpBarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
