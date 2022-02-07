import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

export const UNCATOGARIZED_BUDGET = 'Uncatogarized';

const BudgetContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetContext);
};

// budget : { id, name, max}
// expense : { id, budgetId, description, amount}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name == name)) {
        return prevBudget;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = (id) => {
    console.log(id);
    setExpenses((prevExpenses) => {
      return prevExpenses.map((e) => {
        if (e.budgetId != id) return e;
        return { ...e, budgetId: UNCATOGARIZED_BUDGET };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id != id);
    });
  };

  const addExpense = ({ budgetId, description, amount }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), budgetId, description, amount }];
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id != id);
    });
  };

  const getExpensesByBudgetId = (budgetId) => {
    let exp = expenses.filter((expense) => expense.budgetId == budgetId);
    return exp;
  };

  const totalExpenseAmountbyBudgetId = (budgetId) => {
    let allExpenses = expenses.filter(
      (expense) => expense.budgetId == budgetId
    );
    let totalAmount = 0;
    allExpenses.map((e) => (totalAmount = totalAmount + e.amount));
    return totalAmount;
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
        getExpensesByBudgetId,
        totalExpenseAmountbyBudgetId,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
