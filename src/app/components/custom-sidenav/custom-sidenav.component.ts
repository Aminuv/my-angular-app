import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";

/**
 * @description
 * Interface for the menu items
 */
export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule, RouterModule, MenuItemComponent],
  template: `
    <div class="sidenav-header">
      <img [width]="profilePicSize()" [height]="profilePicSize()" src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1280,quality=50,format=auto/sources/images/IA-technologie.jpeg"/>
      <div class="header-text" [class.hide-header-text]="sideNavCollapsed()">
        <h1>your Channel</h1>
        <p>Amine Marbouh</p>
      </div>
    </div>
    <mat-nav-list>
      @for (item of menuItems; track item.label) {
      <app-menu-item [item]="item" [collapsed]="sideNavCollapsed()"></app-menu-item>
      }
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


    `
  ],
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/tableau-de-bord' },
    { icon: 'video_library', label: 'Videos', route: '/videos' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'account_circle', label: 'Account', route: '/account',
      subItems: [
      { icon: 'logout', label: 'Logout', route: '/logout' },
      { icon: 'settings', label: 'Settings', route: '/settings' },
      { icon: 'person', label: 'Profile', route: '/profile' },
    ]},
  ];
  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}