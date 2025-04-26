import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../models/Expense';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatIconModule, NgStyle, DatePipe, MatButtonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  @Input() expense!: Expense;
  @Output() delete = new EventEmitter<string>();

  // Category colors map
  private categoryColors: Record<string, string> = {
    food: '#FF9800', // Orange
    transport: '#2196F3', // Blue
    bills: '#F44336', // Red
    entertainment: '#9C27B0', // Purple
    other: '#607D8B', // Blue Gray
    // Add more categories as needed
  };

  // Category icons map
  private categoryIcons: Record<string, string> = {
    food: 'restaurant',
    transport: 'directions_car',
    bills: 'home',
    entertainment: 'videocam',
    other: 'other_admission',
  };

  getCategoryColor(category: string): string {
    return this.categoryColors[category.toLowerCase()] || '#e0e0e0';
  }

  getCategoryIcon(category: string): string {
    return this.categoryIcons[category.toLowerCase()] || '';
  }

  deleteExpense(id: string): void {
    this.delete.emit(id);
  }
}
