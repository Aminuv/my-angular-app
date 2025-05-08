import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule],
  template: `
    <div class="analytics-container">
      <div class="dashboard-header">
        <h1 class="page-title">Analytics Dashboard</h1>
        <div class="last-update">Last updated: {{ lastUpdate | date:'medium' }}</div>
      </div>
      
      <mat-grid-list cols="2" rowHeight="200px" gutterSize="16">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>trending_up</mat-icon>
                Total Views
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="metric">{{ formatValue(metrics.totalViews.value.value, 'totalViews') }}</div>
              <div class="trend" [class.positive]="metrics.totalViews.value.trend > 0"
                   [class.negative]="metrics.totalViews.value.trend < 0">
                {{ metrics.totalViews.value.trend > 0 ? '+' : '' }}{{ metrics.totalViews.value.trend }}% vs last week
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>people</mat-icon>
                Active Users
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="metric">{{ formatValue(metrics.activeUsers.value.value, 'activeUsers') }}</div>
              <div class="trend" [class.positive]="metrics.activeUsers.value.trend > 0"
                   [class.negative]="metrics.activeUsers.value.trend < 0">
                {{ metrics.activeUsers.value.trend > 0 ? '+' : '' }}{{ metrics.activeUsers.value.trend }}% vs last week
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>timer</mat-icon>
                Avg. Session Time
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="metric">{{ formatValue(metrics.avgSessionTime.value.value, 'avgSessionTime') }}</div>
              <div class="trend" [class.positive]="metrics.avgSessionTime.value.trend > 0"
                   [class.negative]="metrics.avgSessionTime.value.trend < 0">
                {{ metrics.avgSessionTime.value.trend > 0 ? '+' : '' }}{{ metrics.avgSessionTime.value.trend }}% vs last week
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>done_all</mat-icon>
                Completion Rate
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="metric">{{ formatValue(metrics.completionRate.value.value, 'completionRate') }}</div>
              <div class="trend" [class.positive]="metrics.completionRate.value.trend > 0"
                   [class.negative]="metrics.completionRate.value.trend < 0">
                {{ metrics.completionRate.value.trend > 0 ? '+' : '' }}{{ metrics.completionRate.value.trend }}% vs last week
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 24px;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .page-title {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 500;
      margin: 0;
    }

    .last-update {
      color: #6c757d;
      font-size: 14px;
    }

    .dashboard-card {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      margin: 8px;
      border-radius: 12px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.13);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.08), 0 6px 12px rgba(0,0,0,0.15);
    }

    mat-card-header {
      padding: 16px 16px 0;
      margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 500;
      color: #2c3e50;
      padding-bottom: 16px;
    }

    mat-card-content {
      padding: 0 16px 16px;
    }

    .metric {
      font-size: 36px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .trend {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .trend.positive {
      color: #10b981;
      background-color: #ecfdf5;
    }

    .trend.negative {
      color: #ef4444;
      background-color: #fef2f2;
    }

    mat-icon {
      width: 28px;
      height: 28px;
      font-size: 28px;
      color: #64748b;
    }

    mat-grid-list {
      margin: 0 -8px;
    }
  `]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  lastUpdate = new Date();
  private updateSubscription?: Subscription;

  metrics = {
    totalViews: new BehaviorSubject({ value: 10500, trend: 15 }),
    activeUsers: new BehaviorSubject({ value: 2300, trend: 8 }),
    avgSessionTime: new BehaviorSubject({ value: 332, trend: -2 }),
    completionRate: new BehaviorSubject({ value: 78, trend: 5 })
  };

  ngOnInit() {
    // Simulate real-time updates every 5 seconds
    this.updateSubscription = interval(5000).subscribe(() => {
      this.updateMetrics();
    });
  }

  ngOnDestroy() {
    this.updateSubscription?.unsubscribe();
  }

  private updateMetrics() {
    this.lastUpdate = new Date();
    this.updateMetric(this.metrics.totalViews, 100, 500);
    this.updateMetric(this.metrics.activeUsers, 10, 50);
    this.updateMetric(this.metrics.avgSessionTime, 5, 15);
    this.updateMetric(this.metrics.completionRate, 1, 3, 100);
  }

  private updateMetric(
    subject: BehaviorSubject<any>,
    minChange: number,
    maxChange: number,
    maxValue?: number
  ) {
    const current = subject.getValue();
    const change = Math.random() * (maxChange - minChange) + minChange;
    const increase = Math.random() > 0.3; // 70% chance of increase

    let newValue = increase
      ? current.value + change
      : current.value - change;

    if (maxValue) {
      newValue = Math.min(Math.max(0, newValue), maxValue);
    }

    const trend = ((newValue - current.value) / current.value) * 100;

    subject.next({
      value: Math.round(newValue),
      trend: Number(trend.toFixed(1))
    });
  }

  formatValue(value: number, metric: string): string {
    switch (metric) {
      case 'totalViews':
        return value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value.toString();
      case 'activeUsers':
        return value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value.toString();
      case 'avgSessionTime':
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        return `${minutes}m ${seconds}s`;
      case 'completionRate':
        return value + '%';
      default:
        return value.toString();
    }
  }
}
