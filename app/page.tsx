export default function Home() {
  return (
    <main style={{ background: '#05070B', color: '#F7F4EE', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 'clamp(48px, 9vw, 144px)', fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>MYTH</h1>
      <p style={{ fontSize: '24px', fontStyle: 'italic', opacity: 0.85, marginTop: '24px' }}>Build worlds that outlive you.</p>
      <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid rgba(247,244,238,0.08)' }}>
        <p style={{ fontSize: '14px', opacity: 0.5 }}>The first Culture Engine — Infrastructure for civilizations that intend to be remembered.</p>
        <p style={{ fontSize: '14px', opacity: 0.3, marginTop: '24px' }}>© 2026 MYTH Foundation</p>
      </div>
    </main>
  );
}