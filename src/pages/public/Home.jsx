import { useContext, useState } from 'react';
import { AppDataContext, LOCALITIES } from '../../context/AppDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
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
      <section className="hero-split">
        <div className="hero-left">
          <div className="hero-left-content">
            <h1 className="hero-h1">Find Your Perfect Property in Kerala</h1>
            <p className="hero-desc">Discover 1000+ verified properties across Kerala.<br/>Search by location, budget & lifestyle.</p>
            
            <div className="hero-search">
              <div className="hs-input">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input type="text" placeholder="Search location, city or locality" value={loc} onChange={e => setLoc(e.target.value)} />
              </div>
              <div className="hs-divider"></div>
              <div className="hs-select">
                <select value={purpose} onChange={e => setPurpose(e.target.value)}>
                  <option value="">Property Type</option>
                  <option value="Sale">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                </select>
              </div>
              <div className="hs-divider"></div>
              <div className="hs-select">
                <select>
                  <option value="">Budget</option>
                  <option value="1">Under ₹50 L</option>
                  <option value="2">₹50 L - ₹1 Cr</option>
                  <option value="3">Above ₹1 Cr</option>
                </select>
              </div>
              <button className="hs-btn" onClick={handleSearch}>Search</button>
            </div>

            <div className="hero-features">
              <div className="hf-item">
                <div className="hf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div className="hf-text"><b>Map Based Search</b><span>Explore properties on interactive map</span></div>
              </div>
              <div className="hf-item">
                <div className="hf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>
                <div className="hf-text"><b>Verified Listings</b><span>100% verified properties</span></div>
              </div>
              <div className="hf-item">
                <div className="hf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg></div>
                <div className="hf-text"><b>Wide Range</b><span>Residential, Commercial & Land</span></div>
              </div>
              <div className="hf-item">
                <div className="hf-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></div>
                <div className="hf-text"><b>Local Support</b><span>Expert agents across Kerala</span></div>
              </div>
            </div>

            <div className="hero-locs">
              <h3 className="hl-title">Popular Locations</h3>
              <div className="hl-scroll">
                <div className="hl-card">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80" alt="Payyanur" />
                  <span>Payyanur</span>
                </div>
                <div className="hl-card">
                  <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=200&q=80" alt="Thalassery" />
                  <span>Thalassery</span>
                </div>
                <div className="hl-card">
                  <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80" alt="Taliparamba" />
                  <span>Taliparamba</span>
                </div>
                <div className="hl-card">
                  <img src="https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=200&q=80" alt="Iritty" />
                  <span>Iritty</span>
                </div>
                <div className="hl-card">
                  <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=200&q=80" alt="Mattannur" />
                  <span>Mattannur</span>
                </div>
                <button className="hl-next"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hr-map">
            <APIProvider apiKey="AIzaSyC36wkei0AmiJoLtIwpeVEeeOo4I-st6qQ">
              <Map
                defaultZoom={11}
                defaultCenter={{ lat: 11.874477, lng: 75.370182 }}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
                style={{ width: '100%', height: '100%' }}
              >
                {props.filter(p => p.lat && p.lng).slice(0, 15).map(p => (
                  <AdvancedMarker 
                    key={p.id} 
                    position={{ lat: p.lat, lng: p.lng }}
                    onMouseEnter={() => setActiveMarker(p.id)}
                    onMouseLeave={() => setActiveMarker(null)}
                    onClick={() => setActiveMarker(p.id === activeMarker ? null : p.id)}
                  >
                    <div className={`nq-marker ${activeMarker === p.id ? 'active' : ''}`} style={{ position: 'relative', transform: 'translate(0, -10px)' }}>
                      ₹{p.price}L
                      <div className="nq-marker-caret"></div>
                      
                      {activeMarker === p.id && (
                        <div className="nq-map-popup">
                          <img src={p.imgs?.[0]} alt={p.title} />
                          <div className="nq-mp-info">
                            <b>{p.title}</b>
                            <div className="nq-mp-meta">
                              <span>⭐ {(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                              <strong>₹{p.price}L</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
            <div className="hr-controls">
              <button className="hr-btn active"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Map View</button>
              <button className="hr-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> List View</button>
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
