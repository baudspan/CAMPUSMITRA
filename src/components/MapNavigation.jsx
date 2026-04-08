import React, { useState } from 'react';
import { Navigation, MapPin } from 'lucide-react';

const MapNavigation = () => {
  const [destination, setDestination] = useState('');
  const [isRouting, setIsRouting] = useState(false);

  const handleRoute = () => {
    if(!destination) return;
    setIsRouting(true);
    // Simulate routing calculation
    setTimeout(() => {
      setIsRouting(false);
    }, 1500);
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '16px' }}>Campus Map</h2>
      
      <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef2ff' }}>
        {/* Mock Map Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle at 20px 20px, var(--accent-color) 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        {/* Mock Pathing overlay */}
        {isRouting ? (
          <div style={{ zIndex: 10, textAlign: 'center' }}>
            <div className="pulse-dot" style={{ display: 'inline-block', margin: '0 auto 10px', background: 'var(--primary-color)', width: '12px', height: '12px' }}></div>
            <p style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Calculating optimal route...</p>
          </div>
        ) : destination === 'room4b' ? (
          <div style={{ zIndex: 10, width: '100%', height: '100%', position: 'relative' }}>
            <MapPin size={32} color="var(--primary-color)" style={{ position: 'absolute', top: '30%', left: '40%' }} />
            <div style={{ position: 'absolute', top: '35%', left: '42%', width: '100px', height: '4px', background: 'var(--primary-gradient)', transform: 'rotate(45deg)', borderRadius: '2px' }}></div>
            <MapPin size={32} color="var(--success-color)" style={{ position: 'absolute', top: '60%', left: '60%' }} />
          </div>
        ) : (
          <div style={{ zIndex: 10, textAlign: 'center', color: 'var(--text-secondary)' }}>
            <MapPin size={48} opacity={0.5} style={{ marginBottom: '12px' }} />
            <p>Select a destination to begin routing</p>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Find Your Way</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Destination</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'inherit' }}
          >
            <option value="">Choose a location...</option>
            <option value="main_stage">Main Stage (Event A)</option>
            <option value="room4b">Room 4B (Workshop)</option>
            <option value="food_court">Central Food Court</option>
            <option value="restroom_north">North Restrooms</option>
          </select>
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%' }}
          onClick={handleRoute}
          disabled={!destination || isRouting}
        >
          <Navigation size={20} />
          <span>{isRouting ? 'Routing...' : 'Start Navigation'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        {['Restrooms', 'Water', 'Exit', 'Help'].map(item => (
          <div key={item} className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapNavigation;
