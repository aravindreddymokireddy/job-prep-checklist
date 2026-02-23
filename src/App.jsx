import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import MANGChecklist from './pages/MANGChecklist'
import SystemDesignChecklist from './pages/SystemDesignChecklist'
import Home from './pages/Home'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080c14' }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maang" element={<MANGChecklist />} />
        <Route path="/system-design" element={<SystemDesignChecklist />} />
      </Routes>
    </div>
  )
}

function Nav() {
  const loc = useLocation()
  const linkStyle = (path) => ({
    textDecoration: 'none',
    padding: '8px 18px',
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "'IBM Plex Mono', monospace",
    fontWeight: 600,
    letterSpacing: 0.5,
    transition: 'all 0.2s',
    background: loc.pathname === path ? 'rgba(88,166,255,0.15)' : 'transparent',
    color: loc.pathname === path ? '#58a6ff' : '#8b949e',
    border: `1px solid ${loc.pathname === path ? '#58a6ff40' : 'transparent'}`,
  })

  return (
    <nav style={{
      background: '#0d1117',
      borderBottom: '1px solid #21262d',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: 18, marginRight: 4 }}>🚀</span>
        <span style={{ color: '#e6edf3', fontWeight: 800, fontSize: 14, fontFamily: 'monospace' }}>
          Job Prep
        </span>
      </NavLink>
      <div style={{ flex: 1 }} />
      <NavLink to="/maang" style={() => linkStyle('/maang')}>⚡ MAANG Prep</NavLink>
      <NavLink to="/system-design" style={() => linkStyle('/system-design')}>🏗️ System Design</NavLink>
    </nav>
  )
}
