import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useBudgets, UNCATOGARIZED_BUDGET } from '../contexts/BudgetsContext';

export const AddExpenseModal = ({ show, handleClose, defautlBudgetId }) => {
  const { addExpense, budgets } = useBudgets();

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    let expense = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    };
    // console.log(expense);
    addExpense(expense);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label> Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label> Amount</Form.Label>
            <Form.Control
              type="number"
              required
              step={0.1}
              min={0}
              ref={amountRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label> Budget </Form.Label>
            <Form.Select defaultValue={defautlBudgetId} ref={budgetIdRef}>
              <option value={UNCATOGARIZED_BUDGET}>Uncatogarized</option>
              {budgets.map((budget) => (
                <option value={budget.id} key={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
