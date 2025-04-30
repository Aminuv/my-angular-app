import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

interface Client {
  id: string;
  name: string;
  tel: string;
  email: string;
  address: string;
  products: string[];
  team: string;
  status: string;
  date: string;
  type: 'occupant' | 'bailleur';
}

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Navigation Bar -->
      <mat-toolbar color="primary" class="toolbar-dark">
        <button mat-icon-button>
          <mat-icon>menu</mat-icon>
        </button>
        <span class="toolbar-spacer">SHELLY CRM</span>
        <button mat-icon-button class="avatar-button">
          <div class="avatar">U</div>
        </button>
      </mat-toolbar>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <div class="tab active">
          <mat-icon>people</mat-icon>
          <span>Clients</span>
        </div>
        <div class="tab">
          <mat-icon>dashboard</mat-icon>
          <span>Dashboard</span>
        </div>
        <div class="tab">
          <mat-icon>calendar_today</mat-icon>
          <span>Planning</span>
        </div>
        <div class="tab">
          <mat-icon>receipt</mat-icon>
          <span>Factures</span>
        </div>
        <div class="tab">
          <mat-icon>flash_on</mat-icon>
          <span>Actions</span>
        </div>
      </div>

      <div class="content-container">
        <!-- Filter Panel -->
        <mat-card class="filter-panel">
          <mat-card-content>
            <div class="filter-grid">
              <!-- First Row -->
              <mat-form-field appearance="outline">
                <mat-label>Rechercher</mat-label>
                <input matInput>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Statut RDV</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="confirmed">Confirmé</mat-option>
                  <mat-option value="pending">En attente</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Statut Call</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="scheduled">Planifié</mat-option>
                  <mat-option value="completed">Terminé</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Commercial</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="team1">Équipe 1</mat-option>
                  <mat-option value="team2">Équipe 2</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="filter-grid" [class.expanded]="expanded()">
              <!-- Additional Filters -->
              <mat-form-field appearance="outline">
                <mat-label>Télépro</mat-label>
                <mat-select (click)="toggleExpanded()">
                  <mat-option value="">Tous</mat-option>
                </mat-select>
                <mat-icon matSuffix>{{ expanded() ? 'expand_less' : 'expand_more' }}</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Équipe</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="team1">Équipe 1</mat-option>
                  <mat-option value="team2">Équipe 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Précarité</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="high">Élevée</mat-option>
                  <mat-option value="low">Basse</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Chauffage</mat-label>
                <mat-select>
                  <mat-option value="">Tous</mat-option>
                  <mat-option value="elec">Électrique</mat-option>
                  <mat-option value="gas">Gaz</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <button mat-raised-button color="primary">Préselections</button>
              <button mat-mini-fab color="primary">
                <mat-icon>search</mat-icon>
              </button>
              <button mat-mini-fab class="close-button">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Stats Bar -->
        <div class="stats-bar">
          <mat-chip-set>
            <mat-chip color="primary" selected>
              <mat-icon>add</mat-icon>
              4 962 clients
              <span class="growth-chip">5,4%</span>
            </mat-chip>
          </mat-chip-set>
          
          <button mat-stroked-button class="map-button">
            <mat-icon>map</mat-icon>
            Carte
          </button>
          
          <button mat-stroked-button class="list-button">
            <mat-icon>list</mat-icon>
            Action multiple
          </button>
        </div>

        <!-- Data Table -->
        <mat-card class="table-container">
          <table mat-table [dataSource]="clients" class="mat-elevation-z8">
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let client"> {{client.id}} </td>
            </ng-container>

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Nom </th>
              <td mat-cell *matCellDef="let client">
                <div class="name-cell">
                  <span class="status-dot"></span>
                  <div class="name-content">
                    <span class="primary-text">{{client.name}}</span>
                    <span class="secondary-text">{{client.type}}</span>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Other columns... -->

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                [class.selected-row]="selectedRow() === row.id"
                (click)="onRowClick(row.id)">
            </tr>
          </table>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .toolbar-dark {
      background-color: #1a1a1a;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .avatar-button .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #9c27b0;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tab-navigation {
      display: flex;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }

    .tab {
      padding: 8px 16px;
      display: flex;
      align-items: center;
      opacity: 0.7;
      cursor: pointer;
    }

    .tab.active {
      border-bottom: 2px solid #1976d2;
      opacity: 1;
      color: #1976d2;
    }

    .tab mat-icon {
      margin-right: 4px;
      font-size: 18px;
      height: 18px;
      width: 18px;
    }

    .content-container {
      padding: 16px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .filter-panel {
      margin-bottom: 16px;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .stats-bar {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 16px;
    }

    .growth-chip {
      background-color: #d5f5d5;
      color: #1e701e;
      padding: 2px 6px;
      border-radius: 12px;
      margin-left: 8px;
      font-size: 12px;
    }

    .map-button {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .list-button {
      background-color: #f5f5f5;
      color: #424242;
    }

    .table-container {
      overflow: auto;
    }

    .mat-mdc-row:hover {
      background-color: #f0f7ff;
    }

    .selected-row {
      background-color: #e3f2fd;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #4caf50;
    }

    .name-content {
      display: flex;
      flex-direction: column;
    }

    .primary-text {
      font-weight: 500;
    }

    .secondary-text {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
    }
  `]
})
export class TableauDeBordComponent {
  expanded = signal(false);
  selectedRow = signal<string | null>(null);
  displayedColumns: string[] = [
    'id', 'name', 'tel', 'address', 'products', 
    'team', 'status', 'ndp', 'type', 'dates', 'actions'
  ];

  clients: Client[] = [
    {
      id: "5274",
      name: "M. Tronchet Remy",
      tel: "07 83 13 19 29",
      email: "remytronchet@gmail.com",
      address: "25 RUE GRANDE RUE, 25220 RONGEANT",
      products: ["GROUPE PH (PV 25)"],
      team: "Fofana Souleymane",
      status: "Vérification dossier",
      date: "29/04 12:15",
      type: "occupant"
    },
    {
      id: "5273",
      name: "M. BERGUIGA Samy",
      tel: "06 50 42 63 14",
      email: "berguigasamy@gmail.com",
      address: "478 RUE DU DOCTEUR REBILLARD, 82210 SAINT-ARROUMEX",
      products: ["ISOLEO"],
      team: "Fofana Souleymane",
      status: "Vérification dossier",
      date: "29/04 13:15",
      type: "bailleur"
    },
    // Add more clients here...
  ];

  toggleExpanded() {
    this.expanded.update(value => !value);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "Vérification dossier":
        return "warning";
      case "Welcome CALL 2023":
        return "success";
      case "AUDIT TIERS à revoir":
        return "secondary";
      default:
        return "default";
    }
  }

  onRowClick(id: string) {
    this.selectedRow.set(id);
  }
}
