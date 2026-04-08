import React, { useState } from 'react';
import { Check, Clock, UserCheck, AlertCircle } from 'lucide-react';

const EventChecklist = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Opening Keynote', time: '10:00 AM', status: 'completed', type: 'required' },
    { id: 2, title: 'AI in Sports Tech', time: '11:30 AM', status: 'pending', type: 'optional' },
    { id: 3, title: 'Networking Lunch', time: '1:00 PM', status: 'pending', type: 'social' },
    { id: 4, title: 'VR Hardware Lab', time: '3:00 PM', status: 'queued', type: 'workshop', queuePosition: 4, capacityFull: true }
  ]);

  const [notification, setNotification] = useState(null);

  const toggleStatus = (id) => {
    setEvents(events.map(ev => {
      if (ev.id === id) {
        const newStatus = ev.status === 'completed' ? 'pending' : 'completed';
        
        // Simulate queue popping for someone else if we complete an event
        if (newStatus === 'completed' && ev.title === 'AI in Sports Tech') {
          setTimeout(() => {
            setNotification({
              title: 'Slot Available!',
              message: 'A spot just opened in "VR Hardware Lab" Check-in within 5 minutes.'
            });
            
            // Update queue status
            setEvents(events => events.map(e => e.id === 4 ? {...e, status: 'ready', queuePosition: 0} : e));
          }, 3000);
        }
        
        return { ...ev, status: newStatus };
      }
      return ev;
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'var(--success-color)';
      case 'queued': return '#f59e0b';
      case 'ready': return 'var(--primary-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>My Itinerary</h2>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {events.filter(e => e.status === 'completed').length} / {events.length} Done
        </div>
      </div>

      {notification && (
        <div className="card fade-in" style={{ borderColor: 'var(--primary-color)', background: 'rgba(139, 92, 246, 0.05)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertCircle color="var(--primary-color)" style={{ marginTop: '2px' }} />
          <div>
            <h4 style={{ color: 'var(--primary-color)' }}>{notification.title}</h4>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{notification.message}</p>
            <button 
              className="btn-primary" 
              style={{ marginTop: '12px', padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setNotification(null)}
            >
              Confirm Check-in
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map(event => (
          <div key={event.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0' }}>
            <button 
              onClick={() => toggleStatus(event.id)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `2px solid ${getStatusColor(event.status)}`,
                background: event.status === 'completed' ? 'var(--success-color)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {event.status === 'completed' && <Check size={16} color="white" />}
            </button>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ textDecoration: event.status === 'completed' ? 'line-through' : 'none', opacity: event.status === 'completed' ? 0.6 : 1 }}>
                {event.title}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {event.time}
                </span>
                
                {event.status === 'queued' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 600 }}>
                    <UserCheck size={12} /> #{event.queuePosition} in Queue
                  </span>
                )}
                
                {event.status === 'ready' && (
                  <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Ready to Enter!</span>
                )}
              </div>
            </div>
            
            {event.capacityFull && event.status === 'pending' && (
              <button 
                style={{ background: 'transparent', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: 'var(--border-radius-pill)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setEvents(events.map(e => e.id === event.id ? {...e, status: 'queued'} : e))}
              >
                Join Queue
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventChecklist;
