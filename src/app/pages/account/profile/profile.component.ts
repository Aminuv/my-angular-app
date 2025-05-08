import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="assets/default-avatar.png" alt="Photo de profil">
            <button mat-mini-fab color="primary" class="change-photo-btn">
              <mat-icon>photo_camera</mat-icon>
            </button>
          </div>
          <div class="profile-info">
            <h1>John Doe</h1>
            <p class="role">Administrateur</p>
            <p class="email">john.doe&#64;example.com</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="profile-details">
          <h2>Informations personnelles</h2>
          
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Prénom</mat-label>
              <input matInput value="John">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Nom</mat-label>
              <input matInput value="Doe">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Courriel</mat-label>
              <input matInput value="john.doe@example.com">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Téléphone</mat-label>
              <input matInput value="+1 234 567 890">
            </mat-form-field>
          </div>

          <h2>Informations complémentaires</h2>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Département</mat-label>
              <input matInput value="Ventes">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Localisation</mat-label>
              <input matInput value="Paris">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Biographie</mat-label>
              <textarea matInput rows="4">Professionnel de la vente expérimenté avec plus de 5 ans dans le secteur.</textarea>
            </mat-form-field>
          </div>

          <div class="action-buttons">
            <button mat-raised-button color="primary">Enregistrer les modifications</button>
            <button mat-stroked-button>Annuler</button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .profile-card {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .profile-avatar {
      position: relative;
      width: 120px;
      height: 120px;
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .change-photo-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(25%, 25%);
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    .role {
      color: #666;
      margin: 4px 0;
    }

    .email {
      color: #888;
      margin: 4px 0;
    }

    .profile-details {
      padding: 24px;
    }

    .profile-details h2 {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      margin: 24px 0 16px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }
  `]
})
export class ProfileComponent {}
