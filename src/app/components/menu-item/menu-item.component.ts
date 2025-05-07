import { Component, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
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
  template: `
    <a mat-list-item 
       class="menu-item"
       [routerLink]="item().route"
       (click)="toggleNested()"
       routerLinkActive="selected-menu-item" 
       #rla="routerLinkActive"
       [activated]="rla.isActive">
      <mat-icon 
        [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
        matListItemIcon>{{ item().icon }}</mat-icon>
      @if (!collapsed()) {
        <ng-container matListItemTitle>
          <span>{{ item().label }}</span>
          @if (item().subItems) {
            <mat-icon class="expand-icon" [class.rotated]="nestedMenuOpen()">
              {{ nestedMenuOpen() ? 'expand_less' : 'expand_more' }}
            </mat-icon>
          }
        </ng-container>
      }
    </a>

    @if (item().subItems && nestedMenuOpen() && !collapsed()) {
      <div [@expandContractMenu]>
        @for (subItem of item().subItems; track subItem.label) {
          <a mat-list-item 
             class="menu-item indented"
             [routerLink]="item().route + '/' + subItem.route"
             routerLinkActive="selected-menu-item"
             #subRla="routerLinkActive"
             [activated]="subRla.isActive">
            <mat-icon 
              [fontSet]="subRla.isActive ? 'material-icons' : 'material-icons-outlined'"
              matListItemIcon>{{ subItem.icon }}</mat-icon>
            <span matListItemTitle>{{ subItem.label }}</span>
          </a>
        }
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    :host * {
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .menu-item {
      border-left: 4px solid transparent;
      margin: 4px 8px;
      border-radius: 0 6px 6px 0;
      overflow: hidden;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);

        mat-icon {
          transform: scale(1.1);
        }
      }

      mat-icon {
        margin-right: 8px;
        transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .selected-menu-item {
      border-left-color: var(--primary-color);
      background: rgba(var(--primary-color-rgb), 0.1);
      font-weight: 500;

      &:hover {
        background: rgba(var(--primary-color-rgb), 0.15);
      }

      mat-icon {
        color: var(--primary-color);
      }

      ::ng-deep .mdc-list-item__primary-text {
        color: var(--primary-color);
      }
    }

    .indented {
      padding-left: 48px;
      margin-left: 12px;
      border-left-width: 3px;
      font-size: 0.95em;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .expand-icon {
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      margin-left: 8px;
      
      &.rotated {
        transform: rotate(180deg);
      }
    }

    :host-context(.collapsed) {
      .menu-item {
        margin: 4px;
        border-radius: 6px;
        border-left-width: 0;
        justify-content: center;

        mat-icon {
          margin: 0;
        }
      }
    }
  `]
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input<boolean>(false);
  nestedMenuOpen = signal<boolean>(false);

  toggleNested() {
    if (this.item().subItems) {
      this.nestedMenuOpen.update(value => !value);
    }
  }
}
