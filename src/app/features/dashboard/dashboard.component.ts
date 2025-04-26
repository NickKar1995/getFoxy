import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseService } from './form/services/expense/expense.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormComponent, ExpenseComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly expenseService = inject(ExpenseService);
  expenses$ = this.expenseService.expenses$;
}
