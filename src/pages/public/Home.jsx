import { useContext, useState } from 'react';
import { AppDataContext, LOCALITIES } from '../../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ClientsSectionDemo from '../../components/ui/testimonial-card';

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

export default function Home() {
  const { props } = useContext(AppDataContext);
  const navigate = useNavigate();
  
  const [loc, setLoc] = useState('');
  const [purpose, setPurpose] = useState('');

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
      <section className="hero3">
        <div className="hero3-bg"></div>
        <div className="hero3-watermark">Kannur</div>
        
        {/* Right side tagline */}
        <div className="hero3-side-tag">
          <em>Turning Dreams into Reality,</em>
          <em>One Property at a Time</em>
        </div>
        
        {/* Main content */}
        <div className="hero3-content">
          <div className="hero3-main">
            <h1 className="hero3-h1">
              Buy, Rent, or Lease<br/>
              — Simplifying<br/>
              Your Property<br/>
              Journey
            </h1>
            <p className="hero3-desc">
              Whether you're buying your dream home, renting the perfect space, or leasing with confidence, we make every step simple, smooth, and stress-free across Kannur.
            </p>
            <div className="hero3-btns">
              <button onClick={() => navigate('/results')} className="hero3-btn hero3-btn-dark">
                Explore Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
              </button>
              <button onClick={handleSearch} className="hero3-btn hero3-btn-outline">
                Buy Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
              </button>
            </div>

            {/* Hidden search selects for functionality */}
            <div className="hero3-search-row">
              <div className="hero3-sf">
                <label>Where</label>
                <div className="hero3-sel-wrap">
                  <select value={loc} onChange={e => setLoc(e.target.value)}>
                    <option value="">All Kannur</option>
                    {LOCALITIES.map(l => <option key={l.n} value={l.n}>{l.n}</option>)}
                  </select>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="hero3-sf">
                <label>Purpose</label>
                <div className="hero3-sel-wrap">
                  <select value={purpose} onChange={e => setPurpose(e.target.value)}>
                    <option value="">Buy · Rent · Lease</option>
                    <option value="Sale">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Lease">Lease</option>
                  </select>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <button onClick={handleSearch} className="hero3-search-go">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                Search
              </button>
            </div>
          </div>
          
          {/* Bottom right stat */}
          <div className="hero3-stat">
            <div className="hero3-avatars">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="" className="hero3-av-img"/>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80" alt="" className="hero3-av-img"/>
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=64&q=80" alt="" className="hero3-av-img"/>
            </div>
            <div className="hero3-stat-text">
              <b>850+ <span>Properties</span></b>
              <span>Verified by our team</span>
            </div>
          </div>
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

      <section className="section" id="types" style={{ paddingBottom: '72px' }}>
        <div className="sec-head"><div><h2>Browse by type</h2><p>What are you looking for?</p></div></div>
        <div className="type-row">
          <Link to="/results" className="type-card">
            <div className="t-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/></svg>
            </div>
            <b>Land</b><span>4 listings</span>
          </Link>
          <Link to="/results" className="type-card">
            <div className="t-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <b>House</b><span>5 listings</span>
          </Link>
          <Link to="/results" className="type-card">
            <div className="t-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>
            </div>
            <b>Flat</b><span>2 listings</span>
          </Link>
          <Link to="/results" className="type-card">
            <div className="t-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/><path d="M4 14V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7"/><path d="M2 14h20"/></svg>
            </div>
            <b>Warehouse</b><span>1 listings</span>
          </Link>
          <Link to="/results" className="type-card">
            <div className="t-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <b>Commercial</b><span>2 listings</span>
          </Link>
        </div>
      </section>

      <ClientsSectionDemo />
    </>
  )
}
