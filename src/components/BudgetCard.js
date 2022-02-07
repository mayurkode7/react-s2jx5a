import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { currencyFormatter } from '../utils';
import { Stack, Button } from 'react-bootstrap';

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  currency,
  onAddExpenseClick,
  onViewExpenseClick,
  hideButtons,
}) => {
  // console.log(`currency is ${currency}`);
  const classNames = [];

  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (gray) {
    classNames.push('bg-light');
  }

  return (
    <Card className={classNames}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div className="me-2"> {name} </div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter(currency).format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter(currency).format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => onViewExpenseClick(true)}
            >
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;

function getVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return 'primary';
  if (ratio > 0.75 && ratio < 0.9) return 'warning';
  return 'danger';
}
