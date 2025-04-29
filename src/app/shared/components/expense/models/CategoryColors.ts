import { ExpenseCategory } from './CategoryIcons';

export const categoryColors: Record<ExpenseCategory, string> = {
  [ExpenseCategory.Food]: '#FF9800',
  [ExpenseCategory.Transport]: '#2196F3',
  [ExpenseCategory.Bills]: '#F44336',
  [ExpenseCategory.Entertainment]: '#9C27B0',
  [ExpenseCategory.Other]: '#607D8B',
};
