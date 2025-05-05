import { Routes } from '@angular/router';
import { VideosComponent } from './pages/videos/videos.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AccountComponent } from './pages/account/account.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tableau-de-bord'
      },
      {
        path: 'tableau-de-bord',
        component: TableauDeBordComponent
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
      }
];
