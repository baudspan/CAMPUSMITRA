import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Coffee, Plus, Clock, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { fetchFoodMenu } from '../services/api';

const MenuItem = ({ item, onAdd }) => (
  <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ fontSize: '2rem', background: 'var(--bg-color)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-sm)' }}>
        {item.image}
      </div>
      <div>
        <h4 style={{ margin: 0 }}>{item.name}</h4>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary-color)' }}>{item.price}</p>
      </div>
    </div>
    <button
      className="btn-icon"
      style={{ width: '36px', height: '36px' }}
      onClick={() => onAdd(item.id)}
      aria-label={`Add ${item.name} to cart`}
    >
      <Plus size={16} aria-hidden="true" />
    </button>
  </div>
);

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

const FoodOrder = () => {
  const [cartCount, setCartCount] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [ordered, setOrdered] = useState(false);
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const timeSlots = useMemo(() => ['1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM'], []);

  useEffect(() => {
    let mounted = true;
    fetchFoodMenu().then(data => {
      if (mounted) {
        setMenuItems(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', padding: '40px' }} role="status">
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ marginLeft: '12px' }}>Loading menu...</span>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="card fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--success-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <ShoppingBag size={32} />
        </div>
        <h3>Order Confirmed!</h3>
        <p style={{ marginTop: '8px' }}>Your items will be ready for pickup at <strong>{selectedSlot}</strong> at the Central Food Court.</p>
        <button
          className="btn-primary"
          style={{ marginTop: '24px' }}
          onClick={() => { setOrdered(false); setCartCount(0); setSelectedSlot(''); }}
        >
          New Order
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Pre-Order</h2>
        <div className="glass-panel" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: 600 }}>
          <ShoppingBag size={18} />
          <span>{cartCount} Items</span>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} onAdd={handleAddToCart} />
        ))}
      </div>

      {cartCount > 0 && (
        <div className="card fade-in" style={{ borderColor: 'var(--primary-light)', background: 'white' }}>
          <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--primary-color)" /> Select Pickup Time
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {timeSlots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--border-radius-sm)',
                  border: `1px solid ${selectedSlot === slot ? 'var(--primary-color)' : 'var(--border-color)'}`,
                  background: selectedSlot === slot ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  color: selectedSlot === slot ? 'var(--primary-color)' : 'var(--text-primary)',
                  fontWeight: selectedSlot === slot ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            disabled={!selectedSlot}
            onClick={() => setOrdered(true)}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodOrder;
