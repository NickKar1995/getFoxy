// models/expense-categories.ts
export interface CategoryOption {
  value: string;
  viewValue: string;
  icon?: string;
}

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  // ? Dont forge to check for the icons dude
  { value: 'food', viewValue: 'Food', icon: 'restaurant' },
  { value: 'transport', viewValue: 'Transport', icon: 'directions_car' },
  { value: 'bills', viewValue: 'Bills', icon: 'receipt' },
  { value: 'entertainment', viewValue: 'Entertainment', icon: 'movie' },
  { value: 'other', viewValue: 'Other', icon: 'more_horiz' },
];
