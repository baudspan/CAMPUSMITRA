import React, { useState, useEffect } from 'react';
import { Bell, Info, ShieldAlert, Wifi, Navigation, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { fetchAlerts } from '../services/api';

const IconMapper = ({ type }) => {
  if (type === 'wifi') return <Wifi size={20} aria-hidden="true" />;
  if (type === 'navigation') return <Navigation size={20} aria-hidden="true" />;
  return <Info size={20} aria-hidden="true" />;
};

IconMapper.propTypes = {
  type: PropTypes.string.isRequired
};

const HelpAlerts = () => {
  const [data, setData] = useState({ alerts: [], faqs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const result = await fetchAlerts();
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', padding: '40px' }} role="status">
        <Loader2 className="pulse-dot" style={{ background: 'transparent', animation: 'spin 1s linear infinite' }} />
        <span style={{ marginLeft: '12px' }}>Loading live alerts...</span>
      </div>
    );
  }

  if (error) throw new Error(error);

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '20px' }}>Live Updates</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {data.alerts.map(alert => (
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
        {data.faqs.map(faq => (
          <div key={faq.id} className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ color: 'var(--primary-color)', background: 'var(--accent-color)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
              <IconMapper type={faq.iconType} />
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
        aria-label="Call for Emergency Assistance"
      >
        <ShieldAlert size={20} aria-hidden="true" />
        <span>Emergency Assistance</span>
      </button>
    </div>
  );
};

export default HelpAlerts;
