import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ReportComponent } from './features/report/report.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
