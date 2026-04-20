import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Map, ListTodo, Coffee, Bell, Menu, X, Home, Info, Phone } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';

const MapNavigation = lazy(() => import('./components/MapNavigation'));
const EventChecklist = lazy(() => import('./components/EventChecklist'));
const FoodOrder = lazy(() => import('./components/FoodOrder'));
const HelpAlerts = lazy(() => import('./components/HelpAlerts'));

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

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
              <button className="menu-link" onClick={() => { setMenuOpen(false); navigate('/'); }}>
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
        <ErrorBoundary>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }} role="status">Loading modules...</div>}>
            <Routes>
              <Route path="/" element={<MapNavigation />} />
              <Route path="/events" element={<EventChecklist />} />
              <Route path="/food" element={<FoodOrder />} />
              <Route path="/help" element={<HelpAlerts />} />
              <Route path="*" element={<MapNavigation />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <nav className="bottom-nav" role="navigation" aria-label="Bottom Navigation">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Navigate to Map">
          <Map aria-hidden="true" />
          <span>Map</span>
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Navigate to Itinerary">
          <ListTodo aria-hidden="true" />
          <span>Itinerary</span>
        </NavLink>
        <NavLink to="/food" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Navigate to Food Pre-order">
          <Coffee aria-hidden="true" />
          <span>Food</span>
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} aria-label="Navigate to Live Alerts">
          <Bell aria-hidden="true" />
          <span>Alerts</span>
        </NavLink>
      </nav>
    </>
  );
}

export default App;
