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
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de Bord</h1>
      <div class="content">
        <!-- Add your dashboard content here -->
      </div>
    </div>
  `
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
    this.expanded.set(!this.expanded());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "Vérification dossier":
        return "warn";
      case "Welcome CALL 2023":
        return "primary";
      case "AUDIT TIERS à revoir":
        return "accent";
      default:
        return "default";
    }
  }

  onRowClick(id: string) {
    this.selectedRow.set(id);
  }
}
