import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchService = useCallback(async () => {
    try {
      const response = await api.get(`/services/${serviceId}`);
      setService(response.data);
      setLoading(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Service not found' });
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const bookingData = {
        ...formData,
        service: serviceId
      };
      await api.post('/bookings', bookingData);
      setMessage({ type: 'success', text: 'Booking successful! We will contact you soon.' });
      setTimeout(() => {
        navigate('/services');
      }, 2000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create booking. Please try again.' });
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container" style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
        <h2>Service not found</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ marginBottom: '10px', color: '#333' }}>Book {service.name}</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Price: ₹{service.price} | Duration: {service.duration}
        </p>

        {message.text && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Time *</label>
            <select
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              <option value="09:00-12:00">9:00 AM - 12:00 PM</option>
              <option value="12:00-15:00">12:00 PM - 3:00 PM</option>
              <option value="15:00-18:00">3:00 PM - 6:00 PM</option>
              <option value="18:00-21:00">6:00 PM - 9:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any specific requirements or issues..."
            />
          </div>

          <button type="submit" className="btn" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Submitting...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookService;
