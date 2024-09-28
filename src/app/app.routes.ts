import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Spotify - Web Player: Music for everyone'
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Spotify - Web Player: Music for everyone'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Spotify - Web Player: Music for everyone'
    }
];
