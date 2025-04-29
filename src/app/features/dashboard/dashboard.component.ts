import { Component, inject } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from '../../shared/components/expense/expense.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { AmountsComponent } from '../../shared/components/amounts/amounts.component';
import { ExpenseService } from '../../core/services/expense/expense.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, FormComponent, ExpenseComponent, AsyncPipe, AmountsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent {
  private readonly expenseService = inject(ExpenseService);
  private readonly notificationService = inject(NotificationService);
  todayExpenses$ = this.expenseService.getTodayExpenses$();
  todayTotal$ = this.expenseService.getTodayTotal$();
  monthlyTotal$ = this.expenseService.getMonthlyTotal$();

  onDeleteExpense($event: string) {
    this.expenseService.deleteExpense($event);
    const messageObject = this.notificationService.createSuccessNotificationObj(true);
    this.notificationService.success(messageObject);
  }
}
