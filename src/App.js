import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Container from 'react-bootstrap/Container';
import { Button, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATOGARIZED_BUDGET } from './contexts/BudgetsContext';

import { useBudgets } from './contexts/BudgetsContext';

export default function App() {
  const [showViewExpensesModal, setShowViewExpenseModal] = useState(null);
  const [showAddBudgetModal, setShowAddBudgetModel] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModel] = useState(false);
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] =
    useState(null);
  const { budgets, getExpensesByBudgetId, totalExpenseAmountbyBudgetId } =
    useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModel(true);
    setAddExpensesModalBudgetId(budgetId);
  };

  const resetApp = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h3 className="me-auto"> Budget </h3>
          <Button variant="primary" onClick={() => setShowAddBudgetModel(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>

        <div className="layout">
          {budgets.map((budget) => {
            let expenseAmount = totalExpenseAmountbyBudgetId(budget.id);
            return (
              <BudgetCard
                key={budget.id}
                currency="inr"
                name={budget.name}
                gray
                amount={expenseAmount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setShowViewExpenseModal(budget.id)}
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal(UNCATOGARIZED_BUDGET)}
            onViewExpenseClick={() =>
              setShowViewExpenseModal(UNCATOGARIZED_BUDGET)
            }
          />
          {/* <TotalBudgetCard /> */}
        </div>
        <br />
        <Button variant="outline-danger" onClick={resetApp}>
          Reset App
        </Button>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModel(false)}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        defautlBudgetId={addExpensesModalBudgetId}
        handleClose={() => setShowAddExpenseModel(false)}
      />

      <ViewExpensesModal
        budgetId={showViewExpensesModal}
        handleClose={() => setShowViewExpenseModal(null)}
      />
    </>
  );
}
