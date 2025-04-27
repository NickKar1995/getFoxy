import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseService } from './form/services/expense/expense.service';
import { AsyncPipe } from '@angular/common';
import { AmountsComponent } from '../../shared/components/amounts/amounts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormComponent, ExpenseComponent, AsyncPipe, AmountsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly expenseService = inject(ExpenseService);
  expenses$ = this.expenseService.expenses$;
  todayTotal$ = this.expenseService.getTodayTotal$();
  monthlyTotal$ = this.expenseService.getMonthlyTotal$();

  onDeleteExpense($event: string) {
    this.expenseService.deleteExpense($event);
  }
}
