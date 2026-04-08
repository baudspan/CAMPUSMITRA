import React from 'react';
import { Bell, Info, ShieldAlert, Wifi, Navigation } from 'lucide-react';

const HelpAlerts = () => {
  const alerts = [
    { id: 1, type: 'urgent', title: 'Schedule Change', message: 'The AI Workshop has been moved from Room 4B to the Main Stage.', time: '2 mins ago' },
    { id: 2, type: 'info', title: 'Food Court Busy', message: 'Current wait times at the main food court exceed 20 mins. Use pre-order to save time!', time: '15 mins ago' }
  ];

  const faqs = [
    { id: 1, icon: <Wifi size={20} />, q: 'Campus WiFi', a: 'Network: CampusSync_Guest | Pass: events2026' },
    { id: 2, icon: <Navigation size={20} />, q: 'Lost & Found', a: 'Located at the North Entrance Information Desk.' }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '20px' }}>Live Updates</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {alerts.map(alert => (
          <div key={alert.id} className="card" style={{ 
            borderLeft: `4px solid ${alert.type === 'urgent' ? '#ef4444' : 'var(--primary-color)'}`,
            padding: '16px',
            marginBottom: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: alert.type === 'urgent' ? '#ef4444' : 'var(--primary-color)' }}>
                {alert.title}
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{alert.time}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{alert.message}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '16px' }}>Quick Help</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
        {faqs.map(faq => (
          <div key={faq.id} className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary-color)', background: 'var(--accent-color)', padding: '8px', borderRadius: '50%' }}>
              {faq.icon}
            </div>
            <div>
              <h5 style={{ margin: '0 0 4px 0' }}>{faq.q}</h5>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', background: '#ef4444', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)' }}
      >
        <ShieldAlert size={20} />
        <span>Emergency Assistance</span>
      </button>
    </div>
  );
};

export default HelpAlerts;
