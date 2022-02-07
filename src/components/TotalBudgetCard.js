import React from 'react';
import { useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

const TotalBudgetCard = (props) => {
  const { budgets, expenses } = useBudgets();
  let amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  let max = budgets.reduce((total, budget) => total + budget.max, 0);

  return (
    <BudgetCard
      gray
      name="Total"
      amount={amount}
      max={max}
      hideButtons
      currency="inr"
    />
  );
};

export default TotalBudgetCard;
