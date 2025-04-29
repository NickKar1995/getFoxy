import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../../../features/dashboard/models/Expense';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { categoryColors } from './models/CategoryColors';
import { categoryIcons, ExpenseCategory } from './models/CategoryIcons';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatIconModule, NgStyle, DatePipe, MatButtonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  @Input() expense!: Expense;
  @Input() shouldShowButton = true;
  @Output() delete = new EventEmitter<string>();
  private categoryColors = categoryColors;
  private categoryIcons = categoryIcons;

  getCategoryColor(category: ExpenseCategory): string {
    return this.categoryColors[category] || '#e0e0e0';
  }

  getCategoryIcon(category: ExpenseCategory): string {
    return this.categoryIcons[category] || '';
  }

  deleteExpense(id: string): void {
    this.delete.emit(id);
  }
}
