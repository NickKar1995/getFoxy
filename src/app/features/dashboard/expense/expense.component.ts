import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../models/Expense';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
@Input() expense!: Expense
}
