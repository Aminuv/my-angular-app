import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stats-card">
          <mat-card-content>
            <div class="stat-value">12</div>
            <div class="stat-label">À déposer</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stats-card">
          <mat-card-content>
            <div class="stat-value">8</div>
            <div class="stat-label">Sans retour client</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stats-card">
          <mat-card-content>
            <div class="stat-value">2</div>
            <div class="stat-label">Audits en retard</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stats-card">
          <mat-card-content>
            <div class="stat-value">9</div>
            <div class="stat-label">VT validées</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="dashboard-grid">
        <!-- Dossiers par statut -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Dossiers par statut</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="status-bar">
              <mat-progress-bar mode="determinate" value="100" color="primary"></mat-progress-bar>
              <span>30</span>
            </div>
            <div class="status-bar">
              <mat-progress-bar mode="determinate" value="66" color="primary"></mat-progress-bar>
              <span>20</span>
            </div>
            <div class="status-bar">
              <mat-progress-bar mode="determinate" value="50" color="accent"></mat-progress-bar>
              <span>15</span>
            </div>
            <div class="status-bar">
              <mat-progress-bar mode="determinate" value="33" color="warn"></mat-progress-bar>
              <span>10</span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Alertes -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Alertes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <mat-icon matListItemIcon>warning</mat-icon>
                <div matListItemTitle>1 dossier prêt à déposer, pièces manquantes</div>
                <div matListItemMeta>1</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon>person</mat-icon>
                <div matListItemTitle>1 client a indiqué son propre artisan</div>
                <div matListItemMeta>Voir</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Actions rapides -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Actions rapides</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="actions-container">
              <button mat-stroked-button>Relancer un client</button>
              <button mat-stroked-button>Envoyer une demande au BE</button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Notifications -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Notifications</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <mat-icon matListItemIcon>check_circle</mat-icon>
                <div matListItemTitle>VT validée mais aucun audit planifié</div>
                <div matListItemMeta>Il y a 8 jours</div>
              </mat-list-item>
              <mat-list-item>
                <mat-icon matListItemIcon>info</mat-icon>
                <div matListItemTitle>Revoir client et artisan déclaré</div>
                <div matListItemMeta>Consulter</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.02);
      min-height: calc(100vh - 64px);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    .stats-card {
      text-align: center;
      background-color: white;
      transition: all 300ms ease-in-out;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      color: var(--primary-color);
    }
    .stat-label {
      color: rgba(0, 0, 0, 0.7);
      margin-top: 8px;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .dashboard-card {
      margin-bottom: 20px;
      background-color: white;
      border-radius: 8px;
      transition: all 300ms ease-in-out;
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
    .status-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 12px 0;
    }
    .status-bar mat-progress-bar {
      flex-grow: 1;
    }
    .actions-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .actions-container button {
      flex: 1;
      border-color: var(--primary-color);
      color: var(--primary-color);
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
    mat-list-item {
      margin-bottom: 8px;
      border-radius: 4px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
    mat-card-header {
      margin-bottom: 16px;
    }
  `]
})
export class TableauDeBordComponent {
}
