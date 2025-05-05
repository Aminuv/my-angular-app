import { Component, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-menu-item',
  imports: [MatListModule, RouterModule, MatIconModule],
  template: `
    <a mat-list-item class="menu-item"
         [routerLink]="item().route"
         (click)="toggleNested()"
         routerLinkActive="selected-menu-item" #rla="routerLinkActive"
         [activated]="rla.isActive">
        <mat-icon [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
         matListItemIcon>{{ item().icon }}</mat-icon>
         @if (collapsed()) {
         }
        <span matListItemTitle>{{ item().label }}</span>
        @if (item().subItems && !collapsed()) {
          <span matListItemTitle>
            <mat-icon matListItemIcon>
              @if (nestedMenuOpen()) {
                <mat-icon>expand_less</mat-icon>
              } @else {
                <mat-icon>expand_more</mat-icon>
              }
            </mat-icon>
          </span>
        }
      </a>

      @if (item().subItems && nestedMenuOpen()) {
        <div>
          @for (subItem of item().subItems; track subItem.label) {
            <a mat-list-item 
            [routerLink]="item().route + '/' + subItem.route"
            routerLinkActive
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            >
              <mat-icon 
              [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
              matListItemIcon
              >{{ subItem.icon }}</mat-icon>
              @if (collapsed()) {
              }
              <span matListItemTitle>{{ subItem.label }}</span>
            </a>
          }
        </div>
      }
  `,
  styles: `
  :host * {
      transition: all 500ms ease-in-out;
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
})
export class MenuItemComponent {
  item = input.required<MenuItem>();

  collapsed = input(false);

  nestedMenuOpen = signal(false);

  toggleNested() {
    if (!this.item().subItems) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
