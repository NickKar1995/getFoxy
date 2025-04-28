import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Observable } from 'rxjs';
import { Expense } from '../../../features/dashboard/models/Expense';
import { StorageEnum } from '../../../features/dashboard/models/StorageEnum';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  saveExpense(expense: Expense): void {
    const newExpense: Expense = {
      ...expense,
      id: this.generateId(),
      date: new Date(),
    };
    this.expenses.push(newExpense);
    this.expensesSubject.next(this.expenses);
    this.saveToLocalStorage();
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.expensesSubject.next(this.expenses);
    this.saveToLocalStorage();
  }

  getTodayTotal$(): Observable<number> {
    return this.expenses$.pipe(
      map((expenses) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return expenses
          .filter((expense) => {
            const expenseDate = new Date(expense.date);
            expenseDate.setHours(0, 0, 0, 0);
            return expenseDate.getTime() === today.getTime();
          })
          .reduce((sum, expense) => sum + Number(expense.amount), 0);
      }),
    );
  }

  getTodayExpenses$(): Observable<Expense[]> {
    return this.expenses$.pipe(
      map((expenses) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          expenseDate.setHours(0, 0, 0, 0);
          return expenseDate.getTime() === today.getTime();
        });
      }),
    );
  }
  
  getMonthlyTotal$(): Observable<number> {
    return this.expenses$.pipe(
      map((expenses) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        return expenses
          .filter((expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
          })
          .reduce((sum, expense) => sum + Number(expense.amount), 0);
      }),
    );
  }

  private saveToLocalStorage(): void {
    const expensesToSave = this.expenses.map((expense) => ({
      ...expense,
      date: expense.date instanceof Date ? expense.date.toISOString() : expense.date,
    }));
    localStorage.setItem(StorageEnum.EXPENSES, JSON.stringify(expensesToSave));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(StorageEnum.EXPENSES);
    if (data) {
      const parsedExpenses: Expense[] = JSON.parse(data).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date),
      }));
      this.expenses = parsedExpenses;
      this.expensesSubject.next(this.expenses);
    }
  }
}
