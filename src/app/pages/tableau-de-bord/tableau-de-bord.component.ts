import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface ClientData {
  id: number;
  nom: string;
  tel: string;
  adresse: string;
  produits: string;
  equipe: string;
  status: string;
  ndp: string;
  type: string;
  dates: string;
}

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Search and Actions Bar -->
      <div class="actions-bar">
        <div class="search-section">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Rechercher</mat-label>
            <input matInput [(ngModel)]="searchText" placeholder="Rechercher...">
          </mat-form-field>
          <button mat-stroked-button color="primary">
            <mat-icon>search</mat-icon>
          </button>
          <button mat-stroked-button color="primary">
            <mat-icon>filter_list</mat-icon>
          </button>
          <button mat-stroked-button color="primary">
            <mat-icon>sort</mat-icon>
          </button>
          <button mat-stroked-button color="primary">
            <mat-icon>print</mat-icon>
          </button>
          <button mat-stroked-button color="primary">
            <mat-icon>file_download</mat-icon>
          </button>
        </div>
        <div class="action-buttons">
          <button mat-raised-button color="primary" class="preselection-btn">
            PRÉSÉLECTIONS
          </button>
        </div>
      </div>

      <!-- Client Count -->
      <div class="client-count">
        <mat-icon color="primary">people</mat-icon>
        <span>4 962 clients</span>
        <span class="percentage">5.4%</span>
      </div>

      <!-- Data Table -->
      <table mat-table [dataSource]="clientData" class="mat-elevation-z2">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <!-- Nom Column -->
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let element">
            <div class="name-cell">
              <mat-icon>person</mat-icon>
              <span>{{ element.nom }}</span>
            </div>
          </td>
        </ng-container>

        <!-- Tel Column -->
        <ng-container matColumnDef="tel">
          <th mat-header-cell *matHeaderCellDef>Tel</th>
          <td mat-cell *matCellDef="let element">{{ element.tel }}</td>
        </ng-container>

        <!-- Adresse Column -->
        <ng-container matColumnDef="adresse">
          <th mat-header-cell *matHeaderCellDef>Adresse</th>
          <td mat-cell *matCellDef="let element">{{ element.adresse }}</td>
        </ng-container>

        <!-- Produits Column -->
        <ng-container matColumnDef="produits">
          <th mat-header-cell *matHeaderCellDef>Produits</th>
          <td mat-cell *matCellDef="let element">
            <mat-chip-set>
              <mat-chip color="primary" selected>{{ element.produits }}</mat-chip>
            </mat-chip-set>
          </td>
        </ng-container>

        <!-- Equipe Column -->
        <ng-container matColumnDef="equipe">
          <th mat-header-cell *matHeaderCellDef>Équipe</th>
          <td mat-cell *matCellDef="let element">{{ element.equipe }}</td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">
            <span class="status-badge" [class]="element.status.toLowerCase()">
              {{ element.status }}
            </span>
          </td>
        </ng-container>

        <!-- NDP Column -->
        <ng-container matColumnDef="ndp">
          <th mat-header-cell *matHeaderCellDef>NDP</th>
          <td mat-cell *matCellDef="let element">{{ element.ndp }}</td>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">{{ element.type }}</td>
        </ng-container>

        <!-- Dates Column -->
        <ng-container matColumnDef="dates">
          <th mat-header-cell *matHeaderCellDef>Dates</th>
          <td mat-cell *matCellDef="let element">{{ element.dates }}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item>
                <mat-icon>edit</mat-icon>
                <span>Modifier</span>
              </button>
              <button mat-menu-item>
                <mat-icon>delete</mat-icon>
                <span>Supprimer</span>
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      background-color: #fafafa;
    }

    .actions-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-section {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .search-field {
      width: 300px;
    }

    .preselection-btn {
      height: 40px;
    }

    .client-count {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 14px;
    }

    .percentage {
      color: #4caf50;
      font-weight: 500;
    }

    table {
      width: 100%;
      background: white;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.verification {
      background-color: #ff9800;
      color: white;
    }

    .status-badge.welcome {
      background-color: #4caf50;
      color: white;
    }

    .status-badge.audit {
      background-color: #9c27b0;
      color: white;
    }

    mat-chip {
      font-size: 12px;
      height: 24px;
    }

    th.mat-header-cell {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .mat-column-actions {
      width: 60px;
      text-align: center;
    }
  `]
})
export class TableauDeBordComponent {
  searchText = '';
  displayedColumns: string[] = ['id', 'nom', 'tel', 'adresse', 'produits', 'equipe', 'status', 'ndp', 'type', 'dates', 'actions'];
  
  clientData: ClientData[] = [
    {
      id: 5274,
      nom: 'M. Tronchet Remy',
      tel: '07 83 13 19 29',
      adresse: '25 RUE GRANDE RUE, 25225 RONGEANT',
      produits: 'GROUPE FH',
      equipe: 'Fidana Souleymanc',
      status: 'Verification',
      ndp: '••',
      type: 'occupant',
      dates: '20/04 12:15'
    },
    {
      id: 5273,
      nom: 'M. BERGUIGA Samy',
      tel: '06 50 42 63 14',
      adresse: '47B RUE DU DOCTEUR REBILLARD, 82210',
      produits: 'ISOL\'EO',
      equipe: 'Fidana Souleymanc',
      status: 'Verification',
      ndp: '••',
      type: 'bailleur',
      dates: '20/04 13:15'
    },
    {
      id: 5275,
      nom: 'Mme. Laurent Sophie',
      tel: '06 12 34 56 78',
      adresse: '15 Avenue des Fleurs, 75011 PARIS',
      produits: 'ISOL\'EO',
      equipe: 'Marc Durant',
      status: 'En cours',
      ndp: '•••',
      type: 'occupant',
      dates: '21/04 09:30'
    },
    {
      id: 5276,
      nom: 'M. Martin Pierre',
      tel: '07 98 76 54 32',
      adresse: '8 Rue de la Paix, 69001 LYON',
      produits: 'GROUPE FH',
      equipe: 'Sarah Dubois',
      status: 'Terminé',
      ndp: '•',
      type: 'propriétaire',
      dates: '21/04 14:45'
    },
    {
      id: 5277,
      nom: 'M. Dubois Jean',
      tel: '06 23 45 67 89',
      adresse: '42 Boulevard Victor Hugo, 33000 BORDEAUX',
      produits: 'ISOL\'EO',
      equipe: 'Marc Durant',
      status: 'En attente',
      ndp: '••',
      type: 'bailleur',
      dates: '22/04 10:20'
    },
    {
      id: 5278,
      nom: 'Mme. Petit Marie',
      tel: '07 34 56 78 90',
      adresse: '3 Place Bellecour, 69002 LYON',
      produits: 'GROUPE FH',
      equipe: 'Fidana Souleymanc',
      status: 'Verification',
      ndp: '•••',
      type: 'occupant',
      dates: '22/04 15:30'
    },
    {
      id: 5279,
      nom: 'M. Bernard Thomas',
      tel: '06 87 65 43 21',
      adresse: '17 Rue du Commerce, 44000 NANTES',
      produits: 'ISOL\'EO',
      equipe: 'Sarah Dubois',
      status: 'En cours',
      ndp: '••',
      type: 'propriétaire',
      dates: '23/04 11:00'
    },
    {
      id: 5280,
      nom: 'Mme. Robert Claire',
      tel: '07 45 67 89 01',
      adresse: '29 Avenue Jean Jaurès, 31000 TOULOUSE',
      produits: 'GROUPE FH',
      equipe: 'Marc Durant',
      status: 'Terminé',
      ndp: '•',
      type: 'bailleur',
      dates: '23/04 16:15'
    },
    {
      id: 5281,
      nom: 'Mme. Robert Claire',
      tel: '07 45 67 89 01',
      adresse: '29 Avenue Jean Jaurès, 31000 TOULOUSE',
      produits: 'GROUPE FH',
      equipe: 'Marc Durant',
      status: 'Terminé',
      ndp: '•',
      type: 'bailleur',
      dates: '23/04 16:15'
    },
    {
      id: 5282,
      nom: 'Mme. Robert Claire',
      tel: '07 45 67 89 01',
      adresse: '29 Avenue Jean Jaurès, 31000 TOULOUSE',
      produits: 'GROUPE FH',
      equipe: 'Marc Durant',
      status: 'Terminé',
      ndp: '•',
      type: 'bailleur',
      dates: '23/04 16:15'
    },
    {
      id: 5283,
      nom: 'Mme. Robert Claire',
      tel: '07 45 67 89 01',
      adresse: '29 Avenue Jean Jaurès, 31000 TOULOUSE',
      produits: 'GROUPE FH',
      equipe: 'Marc Durant',
      status: 'Terminé',
      ndp: '•',
      type: 'bailleur',
      dates: '23/04 16:15'
    }
  ];
}
