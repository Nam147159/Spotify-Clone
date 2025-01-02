import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignUpMainComponent } from "./sign-up/sign-up-main/sign-up-main.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MainPanelComponent } from "./main-panel/main-panel.component";
import { SettingsComponent } from "./settings/settings.component";
import { AlbumnInfoComponent } from './albumn-info/albumn-info.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { BrowsePanelComponent } from "./browse-panel/browse-panel.component";
import { CategoryCardComponent } from "./shared/category-card/category-card.component";
import { PlaylistCardComponent } from "./shared/playlist-card/playlist-card.component";

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
      {
        path: "playlist/:id",
        component: PlaylistDetailComponent,
        title: "Spotify - Web Player: Music for everyone",
      },
      {
        path: "settings",
        component: SettingsComponent,
        title: "Spotify - Web Player: Music for everyone",
      },
      {
        path: 'search',
        component: BrowsePanelComponent,
        title: 'Spotify - Playlist Details'
      },
      {
        path: 'album/:id',
        component: AlbumnInfoComponent,
        title: 'Spotify - Album Details'
      },
      {
        path: 'top100/:id',
        component: AlbumnInfoComponent,
        title: 'Spotify - Category Details'
      },
      {
        path: 'recommendplaylist/:id',
        component: AlbumnInfoComponent,
        title: 'Spotify - Recommend Playlist Details'
      },
      {
        path: 'artist/:id',
        component: AlbumnInfoComponent,
        title: 'Spotify - Artist Details'
      }
    ],
  },
  {
    path: "sign-up",
    component: SignUpMainComponent,
    title: 'Spotify - Web Player: Music for everyone'
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Spotify - Web Player: Music for everyone",
  },
];
