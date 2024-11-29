<<<<<<< HEAD
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpMainComponent } from './sign-up/sign-up-main/sign-up-main.component';
import { PlaylistComponent } from './playlist/playlist.component';
||||||| parent of dcf229a (basic profile page)
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpMainComponent } from './sign-up/sign-up-main/sign-up-main.component';
=======
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignUpMainComponent } from "./sign-up/sign-up-main/sign-up-main.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MainPanelComponent } from "./main-panel/main-panel.component";
>>>>>>> dcf229a (basic profile page)

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Spotify - Web Player: Music for everyone",
    children: [
      {
        path: "",
        component: MainPanelComponent,
        title: "Spotify - Web Player: Music for everyone",
      },
      {
        path: "me",
        component: UserProfileComponent,
        title: "Spotify - Web Player: Music for everyone",
      },
    ],
  },
  {
    path: "sign-up",
    component: SignUpMainComponent,
    title: "Spotify - Web Player: Music for everyone",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Spotify - Web Player: Music for everyone",
  },
  {
    path: 'playlist',
    component: PlaylistComponent,
    title: 'Spotify - Web Player: Music for everyone',
  }
];
