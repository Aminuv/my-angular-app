import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

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
  comments: Comment[];
  expanded?: boolean;
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
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <div class="container" [@fadeIn]>
      <div class="dashboard-header">
        <h1 class="page-title">Tableau de Bord</h1>
        <button mat-raised-button color="primary" class="add-button">
          <mat-icon>add</mat-icon> Nouveau Client
        </button>
      </div>

      <mat-card class="search-card">
        <div class="search-filters">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Rechercher par ID ou nom</mat-label>
            <input matInput [formControl]="searchControl" placeholder="Entrez un ID ou nom...">
            <button *ngIf="searchControl.value" matSuffix mat-icon-button aria-label="Clear" (click)="searchControl.setValue('')">
              <mat-icon>close</mat-icon>
            </button>
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
          
          <div class="filter-buttons">
            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [formControl]="statusFilter">
                <mat-option value="">Tous</mat-option>
                <mat-option value="Verification">Vérification</mat-option>
                <mat-option value="En cours">En cours</mat-option>
                <mat-option value="Terminé">Terminé</mat-option>
                <mat-option value="En attente">En attente</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Type</mat-label>
              <mat-select [formControl]="typeFilter">
                <mat-option value="">Tous</mat-option>
                <mat-option value="occupant">Occupant</mat-option>
                <mat-option value="bailleur">Bailleur</mat-option>
                <mat-option value="propriétaire">Propriétaire</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
      </mat-card>

      <div class="table-container mat-elevation-z3">
        <table mat-table [dataSource]="dataSource" matSort class="client-table">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
            <td mat-cell *matCellDef="let client">{{ client.id }}</td>
          </ng-container>

          <!-- Nom Column -->
          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Nom</th>
            <td mat-cell *matCellDef="let client">
              <div class="name-cell">
                <div class="client-details">
                  <span class="client-name">{{ client.nom }}</span>
                  <span class="client-type">{{ client.type }}</span>
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Contact Column -->
          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>Contact</th>
            <td mat-cell *matCellDef="let client">
              <div class="contact-info">
                <div class="tel">
                  <mat-icon class="contact-icon">phone</mat-icon> {{ client.tel }}
                </div>
                <div class="address" matTooltip="{{ client.adresse }}">
                  <mat-icon class="contact-icon">place</mat-icon> {{ client.adresse | slice:0:18 }}...
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Produits Column -->
          <ng-container matColumnDef="produits">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Produits</th>
            <td mat-cell *matCellDef="let client">
              <div class="chip-container">
                <span class="product-chip">{{ client.produits }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Équipe Column -->
          <ng-container matColumnDef="equipe">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Équipe</th>
            <td mat-cell *matCellDef="let client">
              <div class="team-cell">
                <div class="team-avatar">
                  {{ client.equipe.split(' ')[0].charAt(0) }}{{ client.equipe.split(' ')[1]?.charAt(0) || '' }}
                </div>
                <span>{{ client.equipe }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let client">
              <span [class]="'status-badge ' + client.status.toLowerCase()">{{ client.status }}</span>
            </td>
          </ng-container>

          <!-- Comments Column -->
          <ng-container matColumnDef="comments">
            <th mat-header-cell *matHeaderCellDef>Commentaires</th>
            <td mat-cell *matCellDef="let client">
              <div class="comments-cell">
                <button mat-icon-button color="primary" (click)="openComments(client)" [attr.aria-label]="'Voir ' + client.comments.length + ' commentaires pour ' + client.nom">
                  <mat-icon [matBadge]="client.comments.length" matBadgeColor="accent" 
                           [matBadgeHidden]="client.comments.length === 0"
                           aria-hidden="false"
                           [attr.aria-label]="client.comments.length + ' commentaires'">comment</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let client">
              <div class="action-buttons">
                <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Actions" aria-label="Menu d'actions">
                  <mat-icon aria-hidden="false">more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">edit</mat-icon>
                    <span>Éditer</span>
                  </button>
                  <button mat-menu-item color="warn">
                    <mat-icon aria-hidden="true">delete</mat-icon>
                    <span>Supprimer</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">visibility</mat-icon>
                    <span>Voir détails</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">history</mat-icon>
                    <span>Historique</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">print</mat-icon>
                    <span>Imprimer</span>
                  </button>
                </mat-menu>
              </div>
            </td>
          </ng-container>

          <!-- Expanded Content Column -->
          <ng-container matColumnDef="expandedDetail">
            <td mat-cell *matCellDef="let client" [attr.colspan]="displayedColumns.length">
              <div class="expanded-detail" [@detailExpand]="client == expandedElement ? 'expanded' : 'collapsed'">
                <div class="documents-section">
                  <h3>Documents</h3>
                  <div class="document-control">
                    <button mat-icon-button color="primary" (click)="decrementDoc(client)" [disabled]="client.documents <= 0" aria-label="Supprimer un document">
                      <mat-icon aria-hidden="false">remove</mat-icon>
                    </button>
                    <span class="doc-count">{{ client.documents || 0 }}</span>
                    <button mat-icon-button color="primary" (click)="incrementDoc(client)" aria-label="Ajouter un document">
                      <mat-icon aria-hidden="false">add</mat-icon>
                    </button>
                  </div>
                </div>
                <div class="info-section">
                  <h3>Informations</h3>
                  <div class="info-details">
                    <div><strong>NDP: </strong>{{ client.ndp }}</div>
                    <div><strong>Date: </strong>{{ client.dates }}</div>
                  </div>
                </div>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="client-row"
              [class.selected-row]="selectedRow === row"
              [class.expanded-row]="expandedElement === row"
              (click)="selectRow(row)"
              matRipple></tr>
          <tr mat-row *matRowDef="let row; columns: ['expandedDetail']; when: isExpanded" class="detail-row"
              [@detailExpand]="row == expandedElement ? 'expanded' : 'collapsed'"
              [class.expanded-detail-row]="expandedElement === row"></tr>

          <!-- Row shown when no matching data -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell no-data-cell" [attr.colspan]="displayedColumns.length">
              <div class="no-data-message">
                <mat-icon aria-hidden="true">search_off</mat-icon>
                <p>Aucun résultat trouvé pour "{{searchControl.value}}"</p>
              </div>
            </td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 50]"
                       showFirstLastButtons
                       aria-label="Sélectionner une page de clients">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 28px;
      min-height: 100vh;
      max-width: 100%;
      overflow-x: hidden;
      background-color: #f5f7fa;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }

    .add-button {
      padding: 0 16px;
      height: 42px;
    }

    .search-card {
      margin-bottom: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      padding: 20px;
    }

    .search-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      align-items: center;
    }

    .search-field {
      flex: 1 1 300px;
      margin: 0;
    }

    .filter-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .filter-buttons mat-form-field {
      width: 160px;
      margin-bottom: -1.25em;
    }

    .table-container {
      margin-top: 20px;
      overflow: hidden;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .client-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    /* Header row styles */
    .mat-header-row {
      background-color: #f9fafb;
      height: 56px;
    }

    .mat-header-cell {
      color: #4a5568;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border-bottom: 1px solid #e2e8f0;
    }

    /* Row styles */
    .mat-row {
      height: 72px;
      transition: background-color 0.2s;
    }

    .mat-row:hover {
      background-color: #f8fafc;
    }

    .client-row {
      cursor: pointer;
    }

    .selected-row {
      background-color: rgba(66, 153, 225, 0.08) !important;
    }

    .mat-cell {
      color: #2d3748;
      font-size: 14px;
      border-bottom: 1px solid #edf2f7;
      padding: 8px 16px;
    }

    /* Name cell with avatar */
    .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #4299e1;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
    }

    .client-details {
      display: flex;
      flex-direction: column;
    }

    .client-name {
      font-weight: 500;
      margin-bottom: 2px;
    }

    .client-type {
      font-size: 12px;
      color: #718096;
      text-transform: capitalize;
    }

    /* Contact information */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .tel, .address {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }

    .contact-icon {
      font-size: 16px;
      height: 16px;
      width: 16px;
      color: #718096;
    }

    /* Product chip */
    .chip-container {
      display: flex;
    }

    .product-chip {
      padding: 4px 12px;
      background-color: #ebf8ff;
      color: #3182ce;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
    }

    /* Team avatar */
    .team-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .team-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #805ad5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 12px;
    }

    /* Status badges */
    .status-badge {
      padding: 6px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
      text-align: center;
      text-transform: capitalize;
    }

    .status-badge.verification {
      background-color: #FEEBC8;
      color: #C05621;
    }

    .status-badge.en.cours {
      background-color: #BEE3F8;
      color: #2B6CB0;
    }

    .status-badge.terminé {
      background-color: #C6F6D5;
      color: #276749;
    }

    .status-badge.en.attente {
      background-color: #E9D8FD;
      color: #6B46C1;
    }

    /* Comments styles */
    .comments-cell {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Expanded row styles */
    .detail-row {
      height: 0;
    }

    .client-row td {
      border-bottom-width: 0;
    }

    .expanded-detail {
      overflow: hidden;
      display: flex;
      gap: 24px;
      padding: 16px;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }

    .documents-section,
    .info-section {
      flex: 1;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .documents-section h3,
    .info-section h3 {
      margin: 0 0 16px;
      font-size: 16px;
      font-weight: 600;
      color: #2d3748;
    }

    .document-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .doc-count {
      min-width: 24px;
      text-align: center;
      font-weight: 500;
    }

    .info-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .expanded-row {
      background-color: #f8fafc;
    }

    .expanded-detail-row {
      background-color: #f8fafc;
    }

    /* Document counter */
    .document-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .doc-count {
      width: 24px;
      text-align: center;
      font-weight: 500;
    }

    /* Info cell */
    .info-cell {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 13px;
    }

    .info-cell strong {
      color: #4a5568;
    }

    /* Action buttons */
    .action-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    /* No data message */
    .no-data-cell {
      padding: 32px 16px !important;
    }

    .no-data-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #718096;
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
     // background-color: rgba(255, 255, 255, 0.1) !important;
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
export class TableauDeBordComponent implements OnInit, AfterViewInit {
  isExpanded(row: ClientData): boolean {
    return row === this.expandedElement;
  }
  constructor(private dialog: MatDialog) {}

  // Filters and search
  searchControl = new FormControl('');
  statusFilter = new FormControl('');
  typeFilter = new FormControl('');
  
  // Table config
  displayedColumns: string[] = ['id', 'nom', 'contact', 'produits', 'equipe', 'status', 'comments', 'actions'];
expandedElement: ClientData | null = null;;
  dataSource: any;
  selectedRow: ClientData | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
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
      documents: 0,
      comments: []
    }
  ];



  ngOnInit() {
    // Initialize table data source with MatTableDataSource
    this.dataSource = new MatTableDataSource(this.clientData);
    
    // Custom filtering function for MatTableDataSource
    this.dataSource.filterPredicate = (data: ClientData, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.id.toString().includes(searchStr) ||
             data.nom.toLowerCase().includes(searchStr);
    };
    
    // Set up search and filter subscriptions
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => {
        this.applyFilter(value || '');
      });
      
    this.statusFilter.valueChanges.subscribe(() => this.applyFilters());
    this.typeFilter.valueChanges.subscribe(() => this.applyFilters());
  }
  
  ngAfterViewInit() {
    // Connect paginator and sort to the table
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  
  applyFilters() {
    const statusValue = this.statusFilter.value;
    const typeValue = this.typeFilter.value;
    
    // Apply combined filters
    this.dataSource.data = this.clientData.filter(client => {
      let matchesStatus = true;
      let matchesType = true;
      
      if (statusValue) {
        matchesStatus = client.status === statusValue;
      }
      
      if (typeValue) {
        matchesType = client.type.toLowerCase() === typeValue.toLowerCase();
      }
      
      return matchesStatus && matchesType;
    });
    
    // Reset to first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  incrementDoc(client: ClientData) {
    if (!client.documents) client.documents = 0;
    client.documents++;
  }

  decrementDoc(client: ClientData) {
    if (client.documents && client.documents > 0) {
      client.documents--;
    }
  }

  selectRow(row: ClientData) {
    this.expandedElement = this.expandedElement === row ? null : row;
    this.selectedRow = row;
  }

  openComments(client: ClientData) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      height: '100vh',
      position: { right: '0' },
      panelClass: 'comment-dialog',
      data: {
        comments: client.comments,
        clientId: client.id
      }
    });

    dialogRef.afterClosed().subscribe((comment: Comment | undefined) => {
      if (comment) {
        client.comments.push(comment);
      }
    });
  }
}

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="comment-panel" [@slideIn]>
      <div class="header">
        <h2>Commentaires</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="comments-container">
        <div *ngFor="let comment of data.comments" class="comment">
          <div class="comment-header">
            <span class="author">{{comment.author}}</span>
            <span class="timestamp">{{comment.timestamp}}</span>
          </div>
          <div class="comment-content">
            {{comment.text}}
          </div>
        </div>

        <div *ngIf="data.comments.length === 0" class="no-comments">
          <mat-icon>comment</mat-icon>
          <p>Aucun commentaire</p>
        </div>
      </div>

      <div class="comment-input">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Ajouter un commentaire</mat-label>
          <textarea matInput [(ngModel)]="newComment" placeholder="Écrivez votre commentaire ici"></textarea>
        </mat-form-field>
        <button mat-fab color="primary" (click)="postComment()" [disabled]="!newComment.trim()">
          <mat-icon>send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .comment-panel {
      width: 400px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: -2px 0 8px rgba(0,0,0,0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .header h2 {
      margin: 0;
      font-size: 20px;
    }

    .comments-container {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .comment {
      margin-bottom: 16px;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .author {
      font-weight: 500;
      color: #333;
    }

    .timestamp {
      color: #666;
    }

    .comment-content {
      color: #333;
      line-height: 1.4;
    }

    .no-comments {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      height: 200px;
      text-align: center;
    }

    .no-comments mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .comment-input {
      padding: 16px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .full-width {
      width: 100%;
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CommentDialogComponent {
  newComment = '';

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comments: Comment[], clientId: number }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  postComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        text: this.newComment.trim(),
        author: 'User',
        timestamp: new Date().toLocaleString()
      };
      this.dialogRef.close(comment);
    }
  }
}
