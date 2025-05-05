import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  documents?: number;
  type: string;
  dates: string;
}

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatBadgeModule,
    FormsModule
  ],
  template: `
    <div class="container">
      <mat-form-field>
        <mat-label>Rechercher</mat-label>
        <input matInput [(ngModel)]="searchText" placeholder="Rechercher...">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="table-container mat-elevation-z8">
        <table mat-table [dataSource]="filteredData" class="mat-elevation-z8">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let client">{{ client.id }}</td>
          </ng-container>

          <!-- Nom Column -->
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let client">
              <div class="name-cell">
                <span class="client-name">{{ client.nom }}</span>
                <mat-icon class="status-icon" [class.active]="client.status === 'active'">circle</mat-icon>
              </div>
            </td>
          </ng-container>

          <!-- Tel Column -->
          <ng-container matColumnDef="tel">
            <th mat-header-cell *matHeaderCellDef>Tél</th>
            <td mat-cell *matCellDef="let client">{{ client.tel }}</td>
          </ng-container>

          <!-- Adresse Column -->
          <ng-container matColumnDef="adresse">
            <th mat-header-cell *matHeaderCellDef>Adresse</th>
            <td mat-cell *matCellDef="let client">{{ client.adresse }}</td>
          </ng-container>

          <!-- Produits Column -->
          <ng-container matColumnDef="produits">
            <th mat-header-cell *matHeaderCellDef>Produits</th>
            <td mat-cell *matCellDef="let client">
              <mat-chip-set>
                <mat-chip>{{ client.produits }}</mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <!-- Equipe Column -->
          <ng-container matColumnDef="equipe">
            <th mat-header-cell *matHeaderCellDef>Équipe</th>
            <td mat-cell *matCellDef="let client">{{ client.equipe }}</td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let client">
              <span [class]="'status-badge ' + client.status.toLowerCase()">{{ client.status }}</span>
            </td>
          </ng-container>

          <!-- NDP Column -->
          <ng-container matColumnDef="ndp">
            <th mat-header-cell *matHeaderCellDef>NDP</th>
            <td mat-cell *matCellDef="let client">{{ client.ndp }}</td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let client">{{ client.type }}</td>
          </ng-container>

          <!-- Dates Column -->
          <ng-container matColumnDef="dates">
            <th mat-header-cell *matHeaderCellDef>Dates</th>
            <td mat-cell *matCellDef="let client">{{ client.dates }}</td>
          </ng-container>

          <!-- Documents Column -->
          <ng-container matColumnDef="documents">
            <th mat-header-cell *matHeaderCellDef>Documents</th>
            <td mat-cell *matCellDef="let client">
              <mat-form-field appearance="outline" class="small-field">
                <input matInput type="number" min="0" [value]="client.documents || 0">
              </mat-form-field>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let client">
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
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      background-color: #0A1F3C;
      min-height: 100vh;
      color: white;
    }

    .table-container {
      margin-top: 20px;
      overflow-x: auto;
      background-color: white;
      border-radius: 8px;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 60px;
      text-align: center;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .status-badge.verification {
      background-color: #FFF3E0;
      color: #E65100;
    }

    .status-badge.encours {
      background-color: #E3F2FD;
      color: #1565C0;
    }

    .status-badge.termine {
      background-color: #E8F5E9;
      color: #2E7D32;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-icon {
      font-size: 12px;
      height: 12px;
      width: 12px;
      color: #4CAF50;
    }

    .status-icon.active {
      color: #4CAF50;
    }

    mat-form-field {
      width: 100%;
      max-width: 500px;
      color: white;
    }

    ::ng-deep .mat-mdc-form-field-label {
      color: rgba(255, 255, 255, 0.7) !important;
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }

    ::ng-deep .mat-mdc-form-field-icon-suffix {
      color: rgba(255, 255, 255, 0.7);
    }

    .mat-chip-set {
      pointer-events: none;
    }

    .mat-chip {
      background-color: #E3F2FD !important;
      color: #1565C0 !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      height: 24px !important;
      padding: 4px 8px !important;
    }

    .mat-chip .mat-chip-label {
      padding: 0 !important;
    }

    .small-field {
      width: 70px;
      margin: -1em 0;
    }

    .small-field .mat-mdc-form-field-infix {
      padding: 8px 0 !important;
      min-height: unset;
    }

    .small-field .mat-mdc-text-field-wrapper {
      padding: 0 8px;
      background-color: #f5f5f5;
    }

    .small-field .mdc-line-ripple {
      display: none;
    }
  `]
})
export class TableauDeBordComponent {
  searchText = '';
  displayedColumns: string[] = ['id', 'nom', 'tel', 'adresse', 'produits', 'equipe', 'status', 'ndp', 'type', 'dates', 'documents', 'actions'];
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
      dates: '20/04 12:15',
      documents: 0
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
      dates: '20/04 13:15',
      documents: 0
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
      dates: '21/04 09:30',
      documents: 0
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
      dates: '21/04 14:45',
      documents: 0
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
      dates: '22/04 10:20',
      documents: 0
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
      dates: '22/04 15:30',
      documents: 0
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
      dates: '23/04 11:00',
      documents: 0
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
      dates: '23/04 16:15',
      documents: 0
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
      dates: '23/04 16:15',
      documents: 0
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
      dates: '23/04 16:15',
      documents: 0
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
      dates: '23/04 16:15',
      documents: 0
    }
  ];

  get filteredData(): ClientData[] {
    return this.clientData.filter(client => 
      Object.values(client).some(value => 
        value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}
