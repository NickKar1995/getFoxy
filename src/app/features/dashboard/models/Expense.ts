import { ExpenseCategory } from "../../../shared/components/expense/models/CategoryIcons";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
};
