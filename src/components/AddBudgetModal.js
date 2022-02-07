import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export const AddBudgetModal = ({ show, handleClose }) => {
  const { addBudget } = useBudgets();
  const nameRef = useRef();
  const maxRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    let budget = {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    };
    // console.log(budget);
    addBudget(budget);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label> Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              step={0.01}
              min={0}
              ref={maxRef}
            />
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

export default AddBudgetModal;
