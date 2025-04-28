import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/**
 * @description
 * Interface for the menu items
 */
export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule],
  template: `
    <div class="sidenav-header">
      <img width="100" height="100" src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1280,quality=50,format=auto/sources/images/IA-technologie.jpeg"/>
      <div class="header-text">
        <h1>your Channel</h1>
        <p>Amine Marbouh</p>
      </div>
    </div>
    <mat-nav-list>
      <a mat-list-item *ngFor="let item of menuItems">
        <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle>{{ item.label }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
    .sidenav-header {
      padding-top: 25px;
      text-align: center;
      >img {
        border-radius: 100%;
        object-fit: cover;
        margin: 10px auto;
      }
    }
    .header-text {
      >h1 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
      }
      >p {
        margin: 0;
        font-size: 0.8rem;
      }
    }
    `
  ],
})
export class CustomSidenavComponent {
  menuItems: MenuItem[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'video_library', label: 'Videos', route: '/videos' },
    { icon: 'account_circle', label: 'Account', route: '/account' },
    { icon: 'logout', label: 'Logout', route: '/logout' },
  ];
}