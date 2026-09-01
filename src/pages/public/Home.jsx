import { useContext, useState } from 'react';
import { AppDataContext, LOCALITIES } from '../../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import ClientsSectionDemo from '../../components/ui/testimonial-card';

function PropertyCard({ p }) {
  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  return (
    <Link to={`/kannur/${p.type.toLowerCase()}/${p.id}`} className="pcard" style={{ display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', color: 'var(--ink)' }}>
      <div className="pc-media" style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-soft)' }}>
        <img src={p.imgs?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', color: 'rgba(0,0,0,0.5)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(0,0,0,0.5)" stroke="#fff" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>
      <div className="pc-body" style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '15px' }}>
        <div style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span>{p.loc}, Kannur</span>
          <span style={{ fontWeight: 400, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> {rating}</span>
        </div>
        <div style={{ color: 'var(--ink-2)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.type} · {[p.land || p.area, p.beds ? p.beds + ' BHK' : null].filter(Boolean).join(' · ')}</div>
        <div style={{ color: 'var(--ink-2)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.title}</div>
        <div style={{ marginTop: '4px' }}>
          <span style={{ fontWeight: 600 }}>₹{p.price} L</span> <span style={{ color: 'var(--ink)' }}>{p.purpose === 'Rent' ? 'month' : 'total'}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const { props } = useContext(AppDataContext);
  const [purpose, setPurpose] = useState('');
  const [loc, setLoc] = useState('');
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (loc) params.set('loc', loc);
    if (purpose) params.set('purpose', purpose);
    navigate(`/results?${params.toString()}`);
  };
  
  return (
    <>
      <Helmet>
        <title>KARMA Real Estate | Properties in Kannur</title>
        <meta name="description" content="Find your dream home in Kannur. Buy, rent, or lease premium properties verified by KARMA Real Estate." />
      </Helmet>


      <section className="category-bar" style={{ borderBottom: '1px solid var(--line)', position: 'sticky', top: '72px', background: '#fff', zIndex: 40 }}>
        <div className="cat-row" style={{ display: 'flex', alignItems: 'center', gap: '32px', overflowX: 'auto', padding: '16px 24px', maxWidth: '1280px', margin: '0 auto', scrollbarWidth: 'none' }}>
          <Link to="/results" className="cat-item active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--ink)', textDecoration: 'none', opacity: 1, borderBottom: '2px solid var(--ink)', paddingBottom: '8px', minWidth: 'max-content' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Houses</span>
          </Link>
          <Link to="/results" className="cat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--ink-2)', textDecoration: 'none', paddingBottom: '10px', minWidth: 'max-content', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink)'} onMouseOut={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Flats</span>
          </Link>
          <Link to="/results" className="cat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--ink-2)', textDecoration: 'none', paddingBottom: '10px', minWidth: 'max-content', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink)'} onMouseOut={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/></svg>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Land</span>
          </Link>
          <Link to="/results" className="cat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--ink-2)', textDecoration: 'none', paddingBottom: '10px', minWidth: 'max-content', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink)'} onMouseOut={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Commercial</span>
          </Link>
          <Link to="/results" className="cat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--ink-2)', textDecoration: 'none', paddingBottom: '10px', minWidth: 'max-content', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--ink)'} onMouseOut={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/><path d="M4 14V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7"/><path d="M2 14h20"/></svg>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Warehouses</span>
          </Link>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="sec-head">
          <div><h2>Featured properties</h2><p>Hand-picked by our team this week</p></div>
          <Link to="/results" className="sec-link" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>View all →</Link>
        </div>
        <div className="card-row">
          {props.filter(p => p.featured).slice(0, 4).map(p => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="section" id="recent" style={{ paddingBottom: '72px' }}>
        <div className="sec-head">
          <div><h2>Recently added</h2><p>Fresh on the market in Kannur</p></div>
        </div>
        <div className="card-row">
          {props.slice(0, 4).map(p => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>



      <ClientsSectionDemo />
    </>
  )
}
