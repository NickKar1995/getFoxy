import { Component, inject, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MONTHS_EN } from './models/Months';
import { Expense } from '../dashboard/models/Expense';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DayOption } from './models/DayOption';
import { ChartComponent } from './chart/chart.component';
import { ChartData } from 'chart.js';
import { ExpenseComponent } from '../../shared/components/expense/expense.component';
import { ExpenseService } from '../../core/services/expense/expense.service';
import { AmountsComponent } from "../../shared/components/amounts/amounts.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    ChartComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    AsyncPipe,
    CurrencyPipe,
    ExpenseComponent,
    AmountsComponent
],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  months = MONTHS_EN;
  selectedMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  selectedDay = 0;

  monthlyExpenses$!: Observable<Expense[]>;
  top5ExpensesChartData$!: Observable<ChartData<'bar', number[], string> | null>;
  availableDays$!: Observable<DayOption[]>;
  filteredExpenses$!: Observable<Expense[]>;
  totalAmount$!: Observable<number>;

  private monthSubject = new BehaviorSubject<number>(this.selectedMonth);
  private daySubject = new BehaviorSubject<number>(this.selectedDay);

  private readonly expensesService = inject(ExpenseService);

  ngOnInit() {
    this.initializeObservables();
  }

  initializeObservables(): void {
    this.getMonthlyExpensesObservable();
    this.getAvailableDaysObservable();
    this.getFilteredExpensesObservable();
    this.getTotalAmountObservable();
    this.getTop5ExpensesChartData();
  }

  getMonthlyExpensesObservable(): void {
    this.monthlyExpenses$ = combineLatest([this.expensesService.expenses$, this.monthSubject]).pipe(
      map(([expenses, month]) =>
        expenses.filter((expense) => {
          const expenseDate = expense.date;
          return expenseDate.getMonth() === month && expenseDate.getFullYear() === this.currentYear;
        }),
      ),
    );
  }

  getTop5ExpensesChartData(): void {
    this.top5ExpensesChartData$ = this.monthlyExpenses$.pipe(
      map((expenses) => {
        if (!expenses.length) {
          return null;
        }
        const top5Expenses = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5);
        const labels = top5Expenses.map((expense) => expense.title);
        const data = top5Expenses.map((expense) => expense.amount);
        return {
          labels,
          datasets: [
            {
              label: 'Top 5 Expenses',
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        } as ChartData<'bar', number[], string>;
      }),
    );
  }

  getAvailableDaysObservable(): void {
    this.availableDays$ = this.monthlyExpenses$.pipe(
      map((expenses) => {
        const uniqueDays = new Set<number>();
        expenses.forEach((expense) => {
          const expenseDate = expense.date;
          const day = expenseDate.getDate();
          uniqueDays.add(day);
        });
        return Array.from(uniqueDays).map((day) => {
          return {
            value: day,
            viewValue: day.toString(),
          };
        });
      }),
    );
  }

  getFilteredExpensesObservable(): void {
    this.filteredExpenses$ = combineLatest([this.monthlyExpenses$, this.daySubject]).pipe(
      map(([expenses, day]) => {
        if (day === 0) {
          return expenses;
        } else {
          return expenses.filter((expense) => {
            const expenseDate = expense.date;
            return expenseDate.getDate() === day;
          });
        }
      }),
    );
  }

  getTotalAmountObservable(): void {
    this.totalAmount$ = this.filteredExpenses$.pipe(
      map((expenses) => expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)),
    );
  }

  getSelectedMonthName(): string {
    const selectedMonthObj = this.months.find((month) => month.value === this.selectedMonth);
    return selectedMonthObj ? selectedMonthObj.viewValue : ''; // No case that it won't be found
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    this.monthSubject.next(month);
    this.selectedDay = 0;
    this.daySubject.next(0);
  }

  onDayChange(day: number) {
    this.selectedDay = day;
    this.daySubject.next(day);
  }
}
