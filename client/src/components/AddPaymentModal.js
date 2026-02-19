import React, { useState } from 'react';
import './AddPaymentModal.css';

function AddPaymentModal({ balanceDue, onSubmit, onClose }) {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const paymentAmount = parseFloat(amount);

    // Validation
    if (!amount || paymentAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (paymentAmount > balanceDue) {
      setError(`Amount cannot exceed balance due of $${balanceDue.toFixed(2)}`);
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        amount: paymentAmount,
        paymentDate: new Date(paymentDate)
      });
    } catch (err) {
      setError(err.message || 'Failed to add payment');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Payment</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">
              Payment Amount
              <span className="balance-info">
                (Balance Due: ${balanceDue.toFixed(2)})
              </span>
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0.01"
              max={balanceDue}
              placeholder="0.00"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentDate">Payment Date</label>
            <input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPaymentModal;
