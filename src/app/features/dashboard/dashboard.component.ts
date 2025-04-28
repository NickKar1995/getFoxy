import { Component, inject } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from '../../shared/components/expense/expense.component';
import { AsyncPipe } from '@angular/common';
import { AmountsComponent } from '../../shared/components/amounts/amounts.component';
import { ExpenseService } from '../../core/services/expense/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormComponent, ExpenseComponent, AsyncPipe, AmountsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly expenseService = inject(ExpenseService);
  todayExpenses$ = this.expenseService.getTodayExpenses$();
  todayTotal$ = this.expenseService.getTodayTotal$();
  monthlyTotal$ = this.expenseService.getMonthlyTotal$();

  onDeleteExpense($event: string) {
    this.expenseService.deleteExpense($event);
  }
}
