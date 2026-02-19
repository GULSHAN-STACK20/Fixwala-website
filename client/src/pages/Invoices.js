import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Invoices.css';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [showArchived]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/invoices?archived=${showArchived}`);
      setInvoices(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="invoices-container">
        <div className="loading">Loading invoices...</div>
      </div>
    );
  }

  return (
    <div className="invoices-container">
      <div className="invoices-header">
        <h1>Invoices</h1>
        <div className="filter-toggle">
          <label>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />
            Show Archived
          </label>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {invoices.length === 0 ? (
        <div className="no-invoices">
          <p>No {showArchived ? 'archived' : 'active'} invoices found</p>
        </div>
      ) : (
        <div className="invoices-grid">
          {invoices.map((invoice) => (
            <Link
              key={invoice._id}
              to={`/invoices/${invoice._id}`}
              className="invoice-card"
            >
              <div className="invoice-card-header">
                <span className="invoice-number">{invoice.invoiceNumber}</span>
                <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </span>
              </div>
              
              <div className="invoice-card-body">
                <h3>{invoice.customerName}</h3>
                <div className="invoice-dates">
                  <span>Issued: {formatDate(invoice.issueDate)}</span>
                  <span>Due: {formatDate(invoice.dueDate)}</span>
                </div>
              </div>

              <div className="invoice-card-footer">
                <div className="amount-info">
                  <span className="label">Total</span>
                  <span className="value">{formatCurrency(invoice.total)}</span>
                </div>
                <div className="amount-info">
                  <span className="label">Balance Due</span>
                  <span className={`value ${invoice.balanceDue > 0 ? 'unpaid' : 'paid'}`}>
                    {formatCurrency(invoice.balanceDue)}
                  </span>
                </div>
              </div>

              {invoice.isArchived && (
                <div className="archived-badge">Archived</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Invoices;
