import { useState, useEffect } from 'react';
import { Map, ListTodo, Coffee, Bell, Menu, X, Home, Info, Phone } from 'lucide-react';
import MapNavigation from './components/MapNavigation';
import EventChecklist from './components/EventChecklist';
import FoodOrder from './components/FoodOrder';
import HelpAlerts from './components/HelpAlerts';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'map': return <MapNavigation />;
      case 'events': return <EventChecklist />;
      case 'food': return <FoodOrder />;
      case 'help': return <HelpAlerts />;
      default: return <MapNavigation />;
    }
  };

  if (showSplash) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20px 20px, var(--primary-color) 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="typewriter-container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="typewriter-text">Campus Mitra</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="header-title">Campus Mitra</div>
        <button className="btn-icon" style={{ width: '40px', height: '40px', boxShadow: 'none', border: 'none' }} onClick={() => setMenuOpen(true)}>
          <Menu size={24} color="var(--primary-color)" />
        </button>
      </header>

      {/* Side Menu Drawer */}
      {menuOpen && (
        <>
          <div className="menu-overlay fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999 }} onClick={() => setMenuOpen(false)}></div>
          <div className="menu-drawer slide-in" style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '250px', background: 'var(--surface-color)', zIndex: 1000, padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
              <button 
                onClick={() => setMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <button className="menu-link" onClick={() => { setMenuOpen(false); setActiveTab('map'); }}>
                <Home size={20} /> <span>Home</span>
              </button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}>
                <Info size={20} /> <span>About Us</span>
              </button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}>
                <Phone size={20} /> <span>Contact Us</span>
              </button>
            </div>
          </div>
        </>
      )}

      <main className="main-content">
        {renderContent()}
      </main>

      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <Map />
          <span>Map</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <ListTodo />
          <span>Itinerary</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
        >
          <Coffee />
          <span>Food</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          <Bell />
          <span>Alerts</span>
        </button>
      </nav>
    </>
  );
}

export default App;
