import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="settings-container">
      <h1 class="settings-title">Paramètres</h1>

      <div class="settings-grid">
        <!-- Account Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>person</mat-icon>
            <mat-card-title>Paramètres du compte</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <mat-slide-toggle color="primary"></mat-slide-toggle>
                </div>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive email updates about your account</p>
                  </div>
                  <mat-slide-toggle color="primary" checked></mat-slide-toggle>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Appearance Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>palette</mat-icon>
            <mat-card-title>Apparence</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Theme</h3>
                    <p>Choose your preferred theme</p>
                  </div>
                  <mat-form-field appearance="outline">
                    <mat-select value="light">
                      <mat-option value="light">Light</mat-option>
                      <mat-option value="dark">Dark</mat-option>
                      <mat-option value="system">System</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Compact Mode</h3>
                    <p>Use compact view for denser content display</p>
                  </div>
                  <mat-slide-toggle color="primary"></mat-slide-toggle>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Privacy Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>security</mat-icon>
            <mat-card-title>Confidentialité & Sécurité</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Activity Status</h3>
                    <p>Show when you're active</p>
                  </div>
                  <mat-slide-toggle color="primary" checked></mat-slide-toggle>
                </div>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Data Sharing</h3>
                    <p>Share usage data to help improve our services</p>
                  </div>
                  <mat-slide-toggle color="primary"></mat-slide-toggle>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Language Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>language</mat-icon>
            <mat-card-title>Langue & Région</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Language</h3>
                    <p>Choose your preferred language</p>
                  </div>
                  <mat-form-field appearance="outline">
                    <mat-select value="en">
                      <mat-option value="en">English</mat-option>
                      <mat-option value="fr">Français</mat-option>
                      <mat-option value="es">Español</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <div class="setting-item">
                  <div>
                    <h3>Time Zone</h3>
                    <p>Set your local time zone</p>
                  </div>
                  <mat-form-field appearance="outline">
                    <mat-select value="utc">
                      <mat-option value="utc">UTC</mat-option>
                      <mat-option value="est">EST</mat-option>
                      <mat-option value="pst">PST</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="settings-actions">
        <button mat-stroked-button>Cancel</button>
        <button mat-raised-button color="primary">Save Changes</button>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .settings-title {
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 24px;
      color: #333;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .settings-card {
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .mat-mdc-card-header {
      padding: 16px;
    }

    .mat-mdc-card-avatar {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 8px;
      color: #666;
    }

    .mat-mdc-card-title {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 8px 0;
    }

    .setting-item h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .setting-item p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #666;
    }

    mat-form-field {
      width: 150px;
      margin: -1.25em 0;
    }

    .settings-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    ::ng-deep .mat-mdc-list-item {
      height: auto !important;
      padding: 16px !important;
    }
  `]
})
export class SettingsComponent {}
