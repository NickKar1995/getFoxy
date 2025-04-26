import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ExpenseService } from './services/expense/expense.service';
import { EXPENSE_CATEGORIES } from '../models/Categories';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButton,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly expenseService = inject(ExpenseService);
  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.expenseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
      // date: [new Date(), [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
      this.expenseService.saveExpense(this.expenseForm.value)
      this.expenseForm.reset();
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

}
