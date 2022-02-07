import React, { useState, useEffect } from 'react';
import { Modal, Button, Stack } from 'react-bootstrap';
import { useBudgets, UNCATOGARIZED_BUDGET } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';

export const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const {
    budgets,
    expenses,
    deleteBudget,
    deleteExpense,
    getExpensesByBudgetId,
  } = useBudgets();

  const allExpenses = getExpensesByBudgetId(budgetId);

  const budget =
    UNCATOGARIZED_BUDGET == budgetId
      ? { name: 'Uncatogarized', id: UNCATOGARIZED_BUDGET }
      : budgets.find((b) => b.id == budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Stack direction="horizontal">
          <Modal.Title>View Expense of {budget?.name} &nbsp;&nbsp;</Modal.Title>
          {budgetId != UNCATOGARIZED_BUDGET && (
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteBudget(budget?.id);
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {allExpenses?.map((e) => (
            <Stack direction="horizontal" gap="2" key={e.id}>
              <div className="me-auto fs-4"> {e.description} </div>
              <div className="fs-5">
                {currencyFormatter('inr').format(e.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(e.id)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
