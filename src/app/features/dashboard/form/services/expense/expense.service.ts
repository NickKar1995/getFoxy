import { Injectable } from '@angular/core';
import { Expense } from '../../../models/Expense';
import { StorageEnum } from '../../../models/StorageEnum';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
