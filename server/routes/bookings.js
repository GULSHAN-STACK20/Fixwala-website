const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    await newBooking.populate('service');
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    // Validate status value
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate('service');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
