import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpMainComponent } from './sign-up/sign-up-main/sign-up-main.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumnInfoComponent } from './albumn-info/albumn-info.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { BrowsePanelComponent } from './browse-panel/browse-panel.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Spotify - Web Player: Music for everyone',
    children: [
      {
        path: 'home',
        component: MainPanelComponent,
      },
      {
        path: 'search',
        component: BrowsePanelComponent,
        title: 'Spotify - Playlist Details'
      }
    ]
  },
  {
    path: 'sign-up',
    component: SignUpMainComponent,
    title: 'Spotify - Web Player: Music for everyone'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Spotify - Web Player: Music for everyone'
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    title: 'Spotify - Web Player: Music for everyone',
  },
  {
    path: 'album/:id',
    component: AlbumnInfoComponent,
    title: 'Spotify - Web Player: Music for everyone'
  },
];
