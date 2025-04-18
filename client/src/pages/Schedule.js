import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getScheduleEvents, createScheduleEvent, updateScheduleEvent, deleteScheduleEvent } from '../api';

const localizer = momentLocalizer(moment);

// Move EventModal outside of the main component
const EventModal = ({ 
  selectedEvent, 
  newEvent, 
  onTitleChange, 
  onStartChange, 
  onEndChange, 
  onAllDayChange, 
  onSave, 
  onDelete, 
  onClose, 
  titleInputRef 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {selectedEvent ? 'Edit Event' : 'Add New Event'}
      </h2>
      <form onSubmit={onSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            ref={titleInputRef}
            type="text"
            value={newEvent.title}
            onChange={onTitleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter event title (press Enter to confirm)"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={onStartChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="datetime-local"
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={onEndChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newEvent.allDay}
              onChange={onAllDayChange}
              className="mr-2"
            />
            All Day Event
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          {selectedEvent && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {selectedEvent ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: moment().add(1, 'hours').toDate(),
    allDay: false
  });
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const titleInputRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (isModalOpen && titleInputRef.current) {
      // Add a slight delay to ensure DOM is ready
      setTimeout(() => {
        titleInputRef.current.focus();
      }, 50);
    }
  }, [isModalOpen]);

  const fetchEvents = async () => {
    try {
      const response = await getScheduleEvents();
      if (response && response.data) {
        const formattedEvents = response.data.map(event => ({
          id: event._id,
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          allDay: event.isAllDay
        }));
        setEvents(formattedEvents);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      start: start,
      end: end,
      allDay: false
    });
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay
    });
    setIsModalOpen(true);
  };

  const handleEventTitleChange = useCallback((e) => {
    const value = e.target.value;
    setNewEvent(prev => ({
      ...prev,
      title: value
    }));
  }, []);

  const handleStartChange = useCallback((e) => {
    const date = new Date(e.target.value);
    setNewEvent(prev => ({
      ...prev,
      start: date
    }));
  }, []);

  const handleEndChange = useCallback((e) => {
    const date = new Date(e.target.value);
    setNewEvent(prev => ({
      ...prev,
      end: date
    }));
  }, []);

  const handleAllDayChange = useCallback((e) => {
    setNewEvent(prev => ({
      ...prev,
      allDay: e.target.checked
    }));
  }, []);

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    
    try {
      const eventData = {
        title: newEvent.title || "Untitled Event",
        startTime: newEvent.start.toISOString(),
        endTime: newEvent.end.toISOString(),
        isAllDay: newEvent.allDay
      };
      
      let response;
      if (selectedEvent) {
        response = await updateScheduleEvent(selectedEvent.id, eventData);
      } else {
        response = await createScheduleEvent(eventData);
      }
      
      if (response && response.data) {
        const savedEvent = {
          id: response.data._id,
          title: response.data.title,
          start: new Date(response.data.startTime),
          end: new Date(response.data.endTime),
          allDay: response.data.isAllDay
        };
        
        if (selectedEvent) {
          setEvents(prevEvents => 
            prevEvents.map(event => 
              event.id === selectedEvent.id ? savedEvent : event
            )
          );
        } else {
          setEvents(prevEvents => [...prevEvents, savedEvent]);
        }
        
        setIsModalOpen(false);
        setSelectedEvent(null);
      }
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      await deleteScheduleEvent(selectedEvent.id);
      setEvents(prevEvents => 
        prevEvents.filter(event => event.id !== selectedEvent.id)
      );
      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="p-4 h-full">
      <div className="bg-white rounded-lg shadow p-4 h-full">
        <h1 className="text-2xl font-bold mb-4">Schedule</h1>
        <div style={{ height: 'calc(100vh - 200px)' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable={true}
            views={['month']}
            view={view}
            date={date}
            onNavigate={handleNavigate}
            popup={true}
            toolbar={true}
            defaultView={Views.MONTH}
          />
        </div>
      </div>
      {isModalOpen && (
        <EventModal
          selectedEvent={selectedEvent}
          newEvent={newEvent}
          onTitleChange={handleEventTitleChange}
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
          onAllDayChange={handleAllDayChange}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleCloseModal}
          titleInputRef={titleInputRef}
        />
      )}
    </div>
  );
};

export default Schedule;