import { useState, useEffect, lazy, Suspense } from 'react';
import { Map, ListTodo, Coffee, Bell, Menu, X, Home, Info, Phone } from 'lucide-react';

const MapNavigation = lazy(() => import('./components/MapNavigation'));
const EventChecklist = lazy(() => import('./components/EventChecklist'));
const FoodOrder = lazy(() => import('./components/FoodOrder'));
const HelpAlerts = lazy(() => import('./components/HelpAlerts'));

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
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', position: 'relative' }} role="status" aria-live="polite">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20px 20px, var(--primary-color) 2px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true"></div>
        <div className="typewriter-container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="typewriter-text">Campus Mitra</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="app-header" role="banner">
        <div className="header-title">Campus Mitra</div>
        <button 
          className="btn-icon" 
          style={{ width: '40px', height: '40px', boxShadow: 'none', border: 'none' }} 
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open navigation menu"
        >
          <Menu size={24} color="var(--primary-color)" aria-hidden="true" />
        </button>
      </header>

      {/* Side Menu Drawer */}
      {menuOpen && (
        <>
          <div className="menu-overlay fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999 }} onClick={() => setMenuOpen(false)} aria-hidden="true"></div>
          <div className="menu-drawer slide-in" role="dialog" aria-modal="true" aria-label="Side menu" style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '250px', background: 'var(--surface-color)', zIndex: 1000, padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
              <button 
                onClick={() => setMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                aria-label="Close menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <button className="menu-link" onClick={() => { setMenuOpen(false); setActiveTab('map'); }}>
                <Home size={20} aria-hidden="true" /> <span>Home</span>
              </button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}>
                <Info size={20} aria-hidden="true" /> <span>About Us</span>
              </button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}>
                <Phone size={20} aria-hidden="true" /> <span>Contact Us</span>
              </button>
            </nav>
          </div>
        </>
      )}

      <main className="main-content" role="main">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }} role="status">Loading...</div>}>
          {renderContent()}
        </Suspense>
      </main>

      <nav className="bottom-nav" role="navigation" aria-label="Bottom Navigation">
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
          aria-current={activeTab === 'map' ? 'page' : undefined}
          aria-label="Navigate to Map"
        >
          <Map aria-hidden="true" />
          <span>Map</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
          aria-current={activeTab === 'events' ? 'page' : undefined}
          aria-label="Navigate to Itinerary"
        >
          <ListTodo aria-hidden="true" />
          <span>Itinerary</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
          aria-current={activeTab === 'food' ? 'page' : undefined}
          aria-label="Navigate to Food Pre-order"
        >
          <Coffee aria-hidden="true" />
          <span>Food</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
          aria-current={activeTab === 'help' ? 'page' : undefined}
          aria-label="Navigate to Live Alerts"
        >
          <Bell aria-hidden="true" />
          <span>Alerts</span>
        </button>
      </nav>
    </>
  );
}

export default App;
