import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    CustomSidenavComponent
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <button mat-icon-button (click)="collapsed.set(!collapsed())">
          <mat-icon>menu</mat-icon>
        </button>
        <app-custom-sidenav [collapsed]="collapsed()"></app-custom-sidenav>
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    :host {
      display: block;
      height: 100vh;
    }

    mat-sidenav-container {
      height: 100vh;
      background-color:rgb(6, 32, 70);
    }
    
    .content {
      padding: 24px;
      transition: margin-left 500ms ease-in-out;
      background-color:rgb(6, 32, 70);
      min-height: 100vh;
    }

    ::ng-deep {
      .mat-drawer-inner-container {
        overflow: hidden !important;
      }

      .mat-drawer {
        background-color:rgb(6, 32, 70);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
    `
  ],
})
export class AppComponent {
  title = 'my-app';
  collapsed= signal(false);
  sidenavWidth= computed(() => this.collapsed() ? '64px' : '250px');
}
