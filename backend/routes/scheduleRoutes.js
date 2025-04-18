const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  syncWithGoogleCalendar
} = require('../controllers/scheduleController');

// Get all schedule events
router.get('/', getAllEvents);

// Create a new schedule event
router.post('/', createEvent);

// Get a schedule event by ID
router.get('/:id', getEventById);

// Update a schedule event
router.put('/:id', updateEvent);

// Delete a schedule event
router.delete('/:id', deleteEvent);

// Sync with Google Calendar
router.post('/sync', syncWithGoogleCalendar);

module.exports = router; 