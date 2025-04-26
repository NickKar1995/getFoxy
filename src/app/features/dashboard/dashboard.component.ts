import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseService } from './form/services/expense/expense.service';
import { AsyncPipe } from '@angular/common';
import { AmountsComponent } from "../../shared/components/amounts/amounts/amounts.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormComponent, ExpenseComponent, AsyncPipe, AmountsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly expenseService = inject(ExpenseService);
  expenses$ = this.expenseService.expenses$;
  todayTotal$ = this.expenseService.getTodayTotal$();
  monthlyTotal$ = this.expenseService.getMonthlyTotal$();

  ngOnInit(): void {
    // this.updateTotals();
  }

  onDeleteExpense($event: string) {
    console.log($event);
    this.expenseService.deleteExpense($event);
  }

  // private updateTotals(): void {
  //   this.todayTotal = this.expenseService.getTodayTotal();
  //   this.monthlyTotal = this.expenseService.getMonthlyTotal();
  // }
}
