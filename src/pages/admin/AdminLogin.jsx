import { Link } from 'react-router-dom';

export default function AdminLogin() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Sign in to Admin</h1>
        <div style={{ marginBottom: '20px' }}>
          <input type="email" placeholder="team@karmarealestate.in" defaultValue="team@karmarealestate.in" 
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--admin-line-solid)' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input type="password" placeholder="••••••••" 
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--admin-line-solid)' }} />
        </div>
        <Link to="/admin/dashboard" className="btn btn-blue" style={{ width: '100%', display: 'block' }}>Sign in</Link>
        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--admin-ink-2)' }}>Demo mode — enter any password to explore.</p>
      </div>
    </div>
  );
}
