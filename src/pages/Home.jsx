import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const cards = [
    {
      path: '/maang',
      icon: '⚡',
      title: 'MAANG Interview Prep',
      desc: 'DSA patterns, Java/Spring Boot, behavioral STAR stories & process habits.',
      color: '#f59e0b',
      items: '5 sections · 52 topics',
    },
    {
      path: '/system-design',
      icon: '🏗️',
      title: 'System Design',
      desc: 'Foundations, databases, caching, messaging, microservices & practice designs.',
      color: '#60a5fa',
      items: '8 pillars · 59 topics',
    },
  ]

  return (
    <div style={{
      minHeight: 'calc(100vh - 57px)',
      background: '#080c14',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: '#58a6ff', textTransform: 'uppercase', marginBottom: 12 }}>
          aravindreddymokireddy
        </div>
        <h1 style={{
          margin: 0, fontSize: 32, fontWeight: 900, color: '#e6edf3', lineHeight: 1.2
        }}>
          Job Prep Checklist
        </h1>
        <p style={{ color: '#8b949e', fontSize: 14, marginTop: 10 }}>
          Track your MAANG interview readiness — one check at a time.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 700 }}>
        {cards.map(card => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            style={{
              background: '#0d1117',
              border: `1px solid ${card.color}40`,
              borderRadius: 16,
              padding: '28px 28px',
              width: 280,
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: `0 0 0 0 ${card.color}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 24px ${card.color}25`
              e.currentTarget.style.borderColor = card.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `0 0 0 0 ${card.color}`
              e.currentTarget.style.borderColor = `${card.color}40`
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 14 }}>{card.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: card.color, marginBottom: 8 }}>
              {card.title}
            </div>
            <div style={{ fontSize: 12, color: '#8b949e', lineHeight: 1.7, marginBottom: 14 }}>
              {card.desc}
            </div>
            <div style={{
              fontSize: 11, color: '#58a6ff',
              borderTop: '1px solid #21262d', paddingTop: 12,
            }}>
              {card.items} →
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
