import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpMainComponent } from './sign-up/sign-up-main/sign-up-main.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumnInfoComponent } from './albumn-info/albumn-info.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Spotify - Web Player: Music for everyone'
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
    title: 'Spotify - Web Player: Music for everyone'
  },
  {
    path: 'album/:id',
    component: AlbumnInfoComponent,
    title: 'Spotify - Web Player: Music for everyone'
  }
];
