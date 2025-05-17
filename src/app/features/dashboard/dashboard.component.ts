import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ExpenseComponent } from '../../shared/components/expense/expense.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { AmountsComponent } from '../../shared/components/amounts/amounts.component';
import { ExpenseService } from '../../core/services/expense/expense.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../../core/services/notification/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, FormComponent, ExpenseComponent, AsyncPipe, AmountsComponent, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  private readonly expenseService = inject(ExpenseService);
  private readonly notificationService = inject(NotificationService);

  readonly dialog = inject(MatDialog);
  todayExpenses$ = this.expenseService.getTodayExpenses$();
  todayTotal$ = this.expenseService.getTodayTotal$();
  monthlyTotal$ = this.expenseService.getMonthlyTotal$();

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((res) => {
      console.log('esiiii', res);
    });
  }

  onDeleteExpense($event: string) {
    this.expenseService.deleteExpense($event);
    const messageObject = this.notificationService.createSuccessNotificationObj(
      'Success',
      'Deleted!',
    );
    this.notificationService.success(messageObject);
  }

  onEditExpense($event: string) {
    this.expenseService
      .getSpecificExpense$($event)
      .pipe(take(1))
      .subscribe((expense) => {
        this.dialog.open(FormComponent, { data: expense });
      });
  }
}
