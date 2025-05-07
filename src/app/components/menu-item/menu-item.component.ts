import { Component, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-menu-item',
  standalone: true,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ],
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
        <div [@expandContractMenu]>
          @for (subItem of item().subItems; track subItem.label) {
            <a mat-list-item class="menu-item"
            [class.indented]="!collapsed()"
            [routerLink]="item().route + '/' + subItem.route"
            routerLinkActive
            #rla="routerLinkActive"
            [activated]="rla.isActive"
            >
              <mat-icon 
              [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
              matListItemIcon
              >{{ subItem.icon }}</mat-icon>
              @if (!collapsed()) {
              <span matListItemTitle>{{ subItem.label }}</span>
              }
            </a>
          }
        </div>
      }
  `,
  styles: `

  @use "@angular/material" as mat;
 
  :host * {
      transition: all 500ms ease-in-out;
    }
    .menu-item {
      border-left: 5px solid transparent;
      border-left-color: rgba(0, 0, 0, 0);

      @include mat.list-overrides((
        active-indicator-shape: 0px,
        active-indicator-color: rgba(0, 0, 0, 0.1),
        list-item-one-line-container-height: 50px,
      ));
      
    }

    .selected-menu-item {
      border-left-color: var(--primary-color);
      background: rgba(0, 0, 0, 0.1);

      @include mat.list-overrides((
        list-item-leading-icon-color: var(--primary-color),
        list-item-hover-leading-icon-color: var(--primary-color),
        list-item-label-text-color: var(--primary-color),
        list-item-hover-label-text-color: var(--primary-color),
        list-item-focus-label-text-color: var(--primary-color),
        
      ));
    }

    .indented {
      --mat-list-list-item-leading-icon-start-space: 40px;
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
