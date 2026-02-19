import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>Home Repairs, Simplified.</h1>
          <p>Book trusted technicians for AC, Plumbing, and Electrical works in seconds.</p>
          <Link to="/services" className="btn">View Services</Link>
        </div>
      </div>
      
      <section className="container">
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>How It Works</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>01. Select Service</h3>
            <p>Choose from our range of home repair services</p>
          </div>
          <div className="service-card">
            <h3>02. Schedule a Time</h3>
            <p>Pick a convenient date and time for the service</p>
          </div>
          <div className="service-card">
            <h3>03. Expert Arrives</h3>
            <p>Our verified technician arrives at your doorstep</p>
          </div>
          <div className="service-card">
            <h3>04. Problem Solved</h3>
            <p>Get your issue fixed professionally and efficiently</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
