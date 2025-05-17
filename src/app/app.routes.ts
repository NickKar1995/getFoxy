import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'report',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/report/report.component').then((c) => c.ReportComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
