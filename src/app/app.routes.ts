import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'report',
    loadComponent: () =>
      import('./features/report/report.component').then((c) => c.ReportComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
