import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, MatIconModule, MatListModule, RouterModule],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" [height]="profilePicSize()" src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1280,quality=50,format=auto/sources/images/IA-technologie.jpeg"/>
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h1>your Channel</h1>
        <p>Amine Marbouh</p>
      </div>
    </div>
    <mat-nav-list>
      <a mat-list-item class="menu-item"
         *ngFor="let item of menuItems"
         [routerLink]="item.route"
         routerLinkActive="selected-menu-item" #rla="routerLinkActive"
         [activated]="rla.isActive">
        <mat-icon [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
         matListItemIcon>{{ item.icon }}</mat-icon>
        <span matListItemTitle *ngIf="!sideNavCollapsed()">{{ item.label }}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
    :host * {
      transition: all 500ms ease-in-out;
    }
    .sidenav-header {
      padding: 25px;
      text-align: center;
      >img {
        border-radius: 100%;
        object-fit: fill;
        margin: 10px auto;
      }
    }
    .header-text {
      height: 3rem;

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
    .hide-header-text {
      opacity: 0;
      height: 0px !important;
    }

    .menu-item {
      border-left: 5px solid transparent;
      border-left-color: rgba(0, 0, 0, 0);
    }

    .selected-menu-item {
      border-left-color: var(--primary-color);
      background: rgba(0, 0, 0, 0.1);
    }
    `
  ],
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems: MenuItem[] = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'video_library', label: 'Videos', route: '/videos' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'account_circle', label: 'Account', route: '/account' },
  ];
  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}