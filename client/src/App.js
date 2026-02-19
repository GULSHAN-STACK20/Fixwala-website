import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import BookService from './pages/BookService';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book/:serviceId" element={<BookService />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
