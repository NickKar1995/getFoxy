import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NotificationService } from '../../core/services/notification/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Expense } from './models/Expense';
import { ExpenseCategory } from '../../shared/components/expense/models/CategoryIcons';
import { ExpenseService } from '../../core/services/expense/expense.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let notificationServiceStub;
  let debugElement: DebugElement;
  let expenseService: ExpenseService;
  let expenseServiceSpy:any;
  const mockExpense: Expense[] = [
    {
      id: 'exp-001',
      title: 'Groceries',
      amount: 42.5,
      category: ExpenseCategory.Food,
      date: new Date('2025-05-06'),
    },
  ];
  beforeEach(async () => {
    notificationServiceStub = jasmine.createSpyObj('NotificationService', ['success']);
    expenseServiceSpy = jasmine.createSpyObj('ExpenseService', [
      'saveExpense',
      'editExpense',
      'deleteExpense',
      'getTodayTotal$',
      'getTodayExpenses$',
      'getMonthlyTotal$',
      'getSpecificExpense$',
    ]);
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ExpenseService, useValue: expenseServiceSpy },

        // ExpenseService,
      ],
    }).compileComponents();

    // expenseService = TestBed.inject(ExpenseService);
    // spyOn(expenseService, 'getTodayExpenses$').and.returnValue(of(mockExpense));
    fixture = TestBed.createComponent(DashboardComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should create a DOM Expense element', () => {
    expenseServiceSpy.getTodayExpenses$.and.returnValue(of(mockExpense));
    fixture.detectChanges()
    const expenseComponent = debugElement.query(By.css('app-expense'));
    expect(expenseComponent).toBeTruthy();
  });
});
