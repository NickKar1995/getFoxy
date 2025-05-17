import { Component, Inject, inject, Input, OnInit, Optional } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { EXPENSE_CATEGORIES } from '../models/Categories';
import { ExpenseService } from '../../../core/services/expense/expense.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { Expense } from '../models/Expense';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButton,
    NgClass,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly expenseService = inject(ExpenseService);
  private readonly notificationService = inject(NotificationService);
  @Input() data?: Expense;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: Expense | null,
    @Optional() @Inject(MatDialogRef) private dialogRef: any,
  ) {
    if (dialogData && 'title' in dialogData) {
      this.data = dialogData;
    }
  }
  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.expenseForm.patchValue(this.data);
    }
  }

  private initForm(): void {
    this.expenseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.expenseForm.valid) {
      this.expenseForm.markAllAsTouched();
      return;
    }
    if (this.data) {
      this.expenseService.editExpense(this.expenseForm.value, this.data.id);
      const messageObject = this.notificationService.createSuccessNotificationObj(
        'Success',
        'Data edited!',
      );
      this.notificationService.success(messageObject);
      this.dialogRef.close();
    } else {
      this.expenseService.saveExpense(this.expenseForm.value);
      const messageObject = this.notificationService.createSuccessNotificationObj(
        'Success',
        'Data saved!',
      );
      this.notificationService.success(messageObject);
      this.expenseForm.reset();
    }
  }
}
