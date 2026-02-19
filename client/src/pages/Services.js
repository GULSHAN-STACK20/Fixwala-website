import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load services. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
        <h2>Loading services...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ color: 'white', textAlign: 'center', padding: '100px 20px' }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: 'white', marginTop: '40px', marginBottom: '20px' }}>
        Our Services
      </h1>
      <div className="services-grid">
        {services.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'white' }}>
            <p>No services available at the moment.</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="service-card">
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p style={{ fontWeight: 'bold', color: '#667eea', marginBottom: '10px' }}>
                ₹{service.price}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '15px' }}>
                Duration: {service.duration}
              </p>
              <Link to={`/book/${service._id}`} className="btn">
                Book Now
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Services;
