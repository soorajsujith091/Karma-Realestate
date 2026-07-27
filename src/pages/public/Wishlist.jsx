import { useContext } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function PropertyCard({ p }) {
  return (
    <Link to={`/kannur/${p.type.toLowerCase()}/${p.id}`} className="pcard">
      <div className="pc-media">
        <span className={`pc-tag ${p.purpose === 'Sale' ? 'sale' : 'rent'}`}>For {p.purpose.toLowerCase()}</span>
        <div className="pc-track">
          <img src={p.imgs?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'} alt={p.title} />
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-top">
          <div className="pc-title">{p.title}</div>
          <span className={`badge-status ${p.status === 'Available' ? 'avail' : 'nego'}`}>{p.status}</span>
        </div>
        <div className="pc-loc">{p.loc}, Kannur</div>
        <div className="pc-meta">
          {[p.type, p.land || p.area, p.beds ? p.beds + ' BHK' : null].filter(Boolean).join(' · ')}
        </div>
        <div className="pc-price">₹{p.price} L {p.nego && <small>· Negotiable</small>}</div>
      </div>
    </Link>
  );
}

export default function Wishlist() {
  const { props, wishlist } = useContext(AppDataContext);
  
  const savedProps = props.filter(p => wishlist.includes(p.id));

  return (
    <>
      <Helmet>
        <title>Your Wishlist | KARMA Real Estate Kannur</title>
        <meta name="description" content="View your saved properties in Kannur." />
      </Helmet>
      <section className="detail" style={{ minHeight: '80vh' }}>
      <div className="d-head">
        <h1>Your Wishlist</h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 16 }}>{savedProps.length} saved properties</p>
      </div>

      {savedProps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-soft)', borderRadius: 24, marginTop: 40 }}>
          <div className="m-ic" style={{ background: 'rgba(26,77,143,0.1)', color: 'var(--blue)', margin: '0 auto 24px', width: 80, height: 80 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>Nothing saved yet</h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
            Properties you save will appear here so you can easily find them later.
          </p>
          <Link to="/results" className="btn btn-blue" style={{ fontSize: 15 }}>Browse Properties</Link>
        </div>
      ) : (
        <div className="similar-grid" style={{ marginTop: 40 }}>
          {savedProps.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
    </>
  );
}
