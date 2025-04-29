export enum ExpenseCategory {
  Food = 'food',
  Transport = 'transport',
  Bills = 'bills',
  Entertainment = 'entertainment',
  Other = 'other',
}

export const categoryIcons: Record<ExpenseCategory, string> = {
  [ExpenseCategory.Food]: 'restaurant',
  [ExpenseCategory.Transport]: 'directions_car',
  [ExpenseCategory.Bills]: 'home',
  [ExpenseCategory.Entertainment]: 'videocam',
  [ExpenseCategory.Other]: 'other_admission',
};
