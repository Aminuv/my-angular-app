import { Routes } from '@angular/router';
import { VideosComponent } from './pages/videos/videos.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AccountComponent } from './pages/account/account.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';
import { ProfileComponent } from './pages/account/profile/profile.component';
import { LogoutComponent } from './pages/account/logout/logout.component';
import { SettingsComponent } from './pages/account/settings/settings.component';

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
        component: AccountComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: 'logout',
            component: LogoutComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          }
        ]
      }
];
