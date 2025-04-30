import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideosComponent } from './pages/videos/videos.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AccountComponent } from './pages/account/account.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'videos',
        component: VideosComponent
      },
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'tableau-de-bord',
        component: TableauDeBordComponent
      }
];
