import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: Date;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatDividerModule, MatIconModule],
  template: `
    <div class="page-background">
    <div class="account-container">
      <mat-card class="user-info-card">
        <mat-card-header>
          <div mat-card-avatar class="user-avatar">
            <mat-icon>account_circle</mat-icon>
          </div>
          <div class="user-info">
            <mat-card-title>{{ userInfo.firstName }} {{ userInfo.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ userInfo.role }}</mat-card-subtitle>
          </div>
          <div class="info-items">
            <div class="info-item">
              <mat-icon>email</mat-icon>
              <span>{{ userInfo.email }}</span>
            </div>
            <div class="info-item">
              <mat-icon>phone</mat-icon>
              <span>{{ userInfo.phone }}</span>
            </div>
            <div class="info-item">
              <mat-icon>schedule</mat-icon>
              <span>Dernière connexion: {{ userInfo.lastLogin | date:'short' }}</span>
            </div>
          </div>
          <div class="status-badge" [class.active]="userInfo.status === 'active'">
            {{ userInfo.status === 'active' ? 'Actif' : 'Inactif' }}
          </div>
        </mat-card-header>

        <mat-card-content>
          <div class="info-section">
            <h3>Informations de Contact</h3>
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div class="info-content">
                  <label>Courriel</label>
                  <span>{{ userInfo.email }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>phone</mat-icon>
                <div class="info-content">
                  <label>Téléphone</label>
                  <span>{{ userInfo.phone }}</span>
                </div>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="info-section">
            <h3>Détails du Compte</h3>
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>calendar_today</mat-icon>
                <div class="info-content">
                  <label>Membre depuis</label>
                  <span>{{ userInfo.joinDate | date:'mediumDate' }}</span>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>access_time</mat-icon>
                <div class="info-content">
                  <label>Dernière Connexion</label>
                  <div class="last-update">Dernière mise à jour: {{ userInfo.lastLogin | date:'medium':'':'fr' }}</div>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>verified_user</mat-icon>
                <div class="info-content">
                  <label>Statut</label>
                  <span [class.status-active]="userInfo.status === 'active'"
                        [class.status-inactive]="userInfo.status === 'inactive'">
                    {{ userInfo.status === 'active' ? 'Actif' : 'Inactif' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .page-background {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1000;
      height: 72px;
    }

    .account-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    .user-info-card {
      border-radius: 0;
      background: transparent;
      position: relative;
      overflow: hidden;
      box-shadow: none;
      border: none;
    }

    .card-decoration {
      display: none;
    }

    .user-avatar {
      background-color: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 8px 0;
      position: relative;
    }

    .user-avatar mat-icon {
      width: 24px;
      height: 24px;
      font-size: 24px;
      color: #4f46e5;
    }

    mat-card-header {
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 72px;
      gap: 16px;
    }

    .user-info {
      min-width: 200px;
    }

    .info-items {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-left: auto;
      color: #4b5563;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .info-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #6b7280;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      background: #fee2e2;
      color: #ef4444;
      margin-left: 16px;
    }

    .status-badge.active {
      background: #dcfce7;
      color: #10b981;
    }

    mat-card-title {
      color: #1f2937;
      font-size: 16px;
      font-weight: 500;
      margin: 0 8px;
    }

    mat-card-subtitle {
      color: #6b7280;
      font-size: 14px;
      margin: 0;
    }

    .info-section {
      display: none;
    }

    .info-section h3 {
      color: #4f46e5;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .info-section h3::before {
      content: '';
      display: block;
      width: 4px;
      height: 20px;
      background: #4f46e5;
      border-radius: 4px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .info-item mat-icon {
      color: #4f46e5;
      opacity: 0.8;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-content label {
      color: #64748b;
      font-size: 14px;
    }

    .info-content span {
      color: #1e293b;
      font-size: 16px;
    }

    .status-active {
      color: #10b981 !important;
      background: #ecfdf5;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
    }

    .status-inactive {
      color: #ef4444 !important;
      background: #fef2f2;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
    }

    mat-divider {
      margin: 0;
      opacity: 0.1;
    }
  `]
})
export class AccountComponent {
  userInfo: UserInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: new Date('2024-01-15'),
    role: 'Membre Premium',
    status: 'active',
    lastLogin: new Date('2025-05-08T03:42:27')
  };
}
