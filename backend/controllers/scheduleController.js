const Schedule = require('../models/Schedule');

// Get all schedule events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Schedule.find().sort({ startTime: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching schedule events:', error);
    res.status(500).json({ message: 'Error fetching schedule events', error: error.message });
  }
};

// Create a new schedule event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime, location, isAllDay, color, recurrence } = req.body;
    
    const newEvent = new Schedule({
      title,
      description,
      startTime,
      endTime,
      location,
      isAllDay,
      color,
      recurrence
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating schedule event:', error);
    res.status(500).json({ message: 'Error creating schedule event', error: error.message });
  }
};

// Get a schedule event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Schedule.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Schedule event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching schedule event:', error);
    res.status(500).json({ message: 'Error fetching schedule event', error: error.message });
  }
};

// Update a schedule event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime, location, isAllDay, color, recurrence } = req.body;
    
    const updatedEvent = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startTime,
        endTime,
        location,
        isAllDay,
        color,
        recurrence
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Schedule event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating schedule event:', error);
    res.status(500).json({ message: 'Error updating schedule event', error: error.message });
  }
};

// Delete a schedule event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Schedule event not found' });
    }
    res.status(200).json({ message: 'Schedule event deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule event:', error);
    res.status(500).json({ message: 'Error deleting schedule event', error: error.message });
  }
};

// Sync with Google Calendar
exports.syncWithGoogleCalendar = async (req, res) => {
  try {
    // TODO: Implement Google Calendar sync
    res.status(501).json({ message: 'Google Calendar sync not implemented yet' });
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    res.status(500).json({ message: 'Error syncing with Google Calendar', error: error.message });
  }
}; 