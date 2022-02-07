import React from 'react';
import { useBudgets, UNCATOGARIZED_BUDGET } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

const UncategorizedBudgetCard = (props) => {
  const { totalExpenseAmountbyBudgetId } = useBudgets();
  let expenseAmount = totalExpenseAmountbyBudgetId(UNCATOGARIZED_BUDGET);

  return (
    <BudgetCard
      gray
      name="Uncatogarized"
      amount={expenseAmount}
      currency="inr"
      {...props}
    />
  );
};

export default UncategorizedBudgetCard;
