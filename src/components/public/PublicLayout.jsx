import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { LOCALITIES, AppDataContext } from '../../context/AppDataContext'

function CookieBanner() {
  const [show, setShow] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  if (!show) return null;

  return (
    <>
      <div className="cookie-banner">
        <div className="cb-in">
          <div className="cb-txt">
            <b>We value your privacy</b>
            <p>We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
          </div>
          <div className="cb-actions">
            <button className="btn btn-outline" onClick={() => setShowPrefs(true)}>Manage</button>
            <button className="btn btn-blue" onClick={() => setShow(false)}>Accept All</button>
          </div>
        </div>
      </div>
      
      {showPrefs && (
        <div className="overlay" style={{zIndex: 101}} onClick={(e) => e.target.className.includes('overlay') && setShowPrefs(false)}>
          <div className="modal" style={{maxWidth: 400}}>
            <div className="modal-hd">
              <b>Cookie Preferences</b>
              <button className="modal-x" onClick={() => setShowPrefs(false)}>✕</button>
            </div>
            <div className="modal-bd">
              <div className="pref-row">
                <div>
                  <b>Essential Cookies</b>
                  <p>Required for the website to function.</p>
                </div>
                <div className="toggle disabled on"></div>
              </div>
              <div className="pref-row">
                <div>
                  <b>Analytics Cookies</b>
                  <p>Help us improve our website by collecting anonymous usage data.</p>
                </div>
                <div className={`toggle ${analytics ? 'on' : ''}`} onClick={() => setAnalytics(!analytics)}></div>
              </div>
              <button className="btn btn-blue" style={{width: '100%', marginTop: 24}} onClick={() => { setShowPrefs(false); setShow(false); }}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Header() {
  const { user, setUser, showAuthModal, setShowAuthModal } = useContext(AppDataContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // OTP Modal State
  const [step, setStep] = useState(0); // 0: details, 1: otp, 2: success
  const [formData, setFormData] = useState({ name: '', phone: '', loc: 'Kannur City' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Cooldown effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (cooldown === 0 && attempts >= 3) {
      setAttempts(0); // Reset attempts after cooldown
    }
  }, [cooldown, attempts]);

  useEffect(() => {
    setScrolled(true); // Always solid header since new hero has a light background
  }, [isHome]);

  return (
    <>
      <header className={`hdr ${scrolled ? 'hdr-solid' : 'hdr-transparent'}`}>
        <div className="hdr-in">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <div className="logo-mark">K</div>
            <div className="logo-txt"><b>KARMA</b><span>REAL ESTATE</span></div>
          </Link>
          <nav className="hdr-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/results" className="nav-link">Properties</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
            {user ? (
              <div className="user-dropdown-wrap" style={{ position: 'relative' }}>
                <button className="hdr-user">
                  <span>{user.name.split(' ')[0]}</span>
                  <span className="avatar" style={{background: 'var(--accent)', color: '#fff'}}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </button>
                <div className="user-dropdown">
                  <button onClick={() => setUser(null)}>Log out</button>
                </div>
              </div>
            ) : (
              <button className="hdr-user" onClick={() => setShowAuthModal(true)}>
                <span>Sign in</span>
                <span className="avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>
                </span>
              </button>
            )}
            <button className="pub-menu-btn" onClick={() => setShowMobileMenu(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <div className="overlay" style={{zIndex: 99}} onClick={(e) => e.target.className.includes('overlay') && setShowMobileMenu(false)}></div>
      )}
      <div className={`pub-side ${showMobileMenu ? 'open' : ''}`}>
        <div className="pub-side-hd">
          <div className="logo-txt"><b style={{color: 'var(--blue)'}}>KARMA</b><span style={{color: 'var(--ink-2)'}}>REAL ESTATE</span></div>
          <button className="pub-side-close" onClick={() => setShowMobileMenu(false)}>✕</button>
        </div>
        <nav className="pub-side-nav">
          <Link to="/" className="pub-side-link" onClick={() => setShowMobileMenu(false)}>Home</Link>
          <Link to="/results" className="pub-side-link" onClick={() => setShowMobileMenu(false)}>Properties</Link>
          <Link to="/about" className="pub-side-link" onClick={() => setShowMobileMenu(false)}>About Us</Link>
          <Link to="/wishlist" className="pub-side-link" onClick={() => setShowMobileMenu(false)}>Wishlist</Link>
          {user ? (
            <div style={{ borderTop: '1px solid var(--line)', marginTop: 'auto', paddingTop: 24 }}>
              <div style={{ padding: '0 24px', fontSize: 13, color: 'var(--ink-2)', marginBottom: 8 }}>Signed in as</div>
              <div style={{ padding: '0 24px', fontSize: 16, color: 'var(--ink)', fontWeight: 600, marginBottom: 16 }}>{user.name}</div>
              <button className="pub-side-link" style={{color: 'var(--red)'}} onClick={() => { setShowMobileMenu(false); setUser(null); }}>
                Log out
              </button>
            </div>
          ) : (
            <button className="pub-side-link" style={{color: 'var(--blue)'}} onClick={() => { setShowMobileMenu(false); setShowAuthModal(true); }}>
              Sign in / Register
            </button>
          )}
        </nav>
      </div>

      {/* Auth Gate and other modals below */}
      {showAuthModal && (
        <div className="overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="modal-hd">
              <b>{step === 0 ? 'Sign in' : step === 1 ? 'Verify OTP' : 'Success'}</b>
              <button className="modal-x" onClick={() => { setShowAuthModal(false); setTimeout(()=>setStep(0),300); }}>✕</button>
            </div>
            
            <div className="modal-bd">
              {step === 0 && (
                <>
                  <div className="m-lede">
                    <div className="m-ic">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>
                      </svg>
                    </div>
                    <h3>Welcome to KARMA</h3>
                    <p>Verify your mobile number once to unlock full property details across the site.</p>
                  </div>
                  <div className="fld">
                    <label>Your name</label>
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Anjali Menon" autoComplete="name" />
                  </div>
                  <div className="fld">
                    <label>Mobile number</label>
                    <div className="ph-row">
                      <span className="cc">+91</span>
                      <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="10-digit mobile number" inputMode="numeric" maxLength="10" />
                    </div>
                  </div>
                  <div className="fld">
                    <label>Your location</label>
                    <div className="select-wrap">
                      <select value={formData.loc} onChange={e => setFormData({...formData, loc: e.target.value})}>
                        {LOCALITIES.map(l => <option key={l.n} value={l.n}>{l.n}</option>)}
                        <option value="Outside Kannur">Outside Kannur</option>
                      </select>
                      <svg className="sel-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                  <button className="btn btn-blue" style={{ width: '100%' }} disabled={!formData.name || formData.phone.length < 10} onClick={() => setStep(1)}>
                    Send OTP
                  </button>
                  <p className="m-note">
                    By continuing you agree to our <Link to="/privacy-policy" onClick={() => setShowAuthModal(false)} style={{ cursor: 'pointer', color: 'var(--blue)' }}>Privacy Policy</Link>. We only use your number to help with your property search — no spam.
                  </p>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="m-lede">
                    <div className="m-ic" style={{background: 'var(--accent-soft)', color: 'var(--blue)'}}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <h3>Enter Verification Code</h3>
                    <p>We've sent a 4-digit code to <b>+91 {formData.phone}</b>. Enter it below to continue. <br/><small>(Hint: Use 1234)</small></p>
                  </div>
                  <div className="otp-row" style={{display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24}}>
                    {otp.map((d, i) => (
                      <input key={i} ref={otpRefs[i]} value={d} type="text" inputMode="numeric" maxLength="1" disabled={cooldown > 0}
                        style={{width: 50, height: 56, fontSize: 24, textAlign: 'center', borderRadius: 12, border: '1px solid var(--line)', background: cooldown > 0 ? 'var(--bg-soft)' : '#fff', fontWeight: 600, color: 'var(--ink)'}}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '');
                          const newOtp = [...otp]; newOtp[i] = v; setOtp(newOtp);
                          if (v && i < 3) otpRefs[i+1].current.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i-1].current.focus();
                        }}
                      />
                    ))}
                  </div>
                  {cooldown > 0 ? (
                    <div style={{color: 'red', textAlign: 'center', marginBottom: 20, fontSize: 14, fontWeight: 500}}>
                      Too many failed attempts. Try again in {cooldown}s.
                    </div>
                  ) : (
                    <button className="btn btn-blue" style={{ width: '100%' }} disabled={otp.join('').length < 4} onClick={() => {
                      if (otp.join('') === '1234') {
                        setStep(2);
                      } else {
                        setAttempts(a => a + 1);
                        setOtp(['','','','']);
                        otpRefs[0].current.focus();
                        if (attempts >= 2) setCooldown(60);
                      }
                    }}>
                      Verify & Continue
                    </button>
                  )}
                  <p className="m-note" style={{textAlign: 'center', marginTop: 16}}>
                    Didn't receive it? <a style={{ cursor: 'pointer', color: 'var(--blue)' }}>Resend Code</a>
                  </p>
                </>
              )}

              {step === 2 && (
                <div style={{textAlign: 'center', padding: '20px 0'}}>
                  <div className="m-ic" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', margin: '0 auto 20px', width: 64, height: 64}}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{fontSize: 22, color: 'var(--ink)', marginBottom: 8}}>You're all set!</h3>
                  <p style={{color: 'var(--ink-2)', fontSize: 15, marginBottom: 32}}>Your number is verified. You now have full access to view property details and contact owners.</p>
                  <button className="btn btn-blue" style={{ width: '100%' }} onClick={() => {
                    setUser({ name: formData.name, phone: formData.phone, loc: formData.loc });
                    setShowAuthModal(false);
                    setTimeout(()=>setStep(0),300);
                  }}>
                    Start Exploring
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="f-brand">
          <div className="logo"><div className="logo-mark">K</div><div className="logo-txt"><b style={{color:'#fff'}}>KARMA</b><span style={{color:'#8FA3C2'}}>REAL ESTATE</span></div></div>
          <p>A Kannur-first property marketplace. Land, houses, flats, warehouses and commercial spaces — for sale, rent and lease.</p>
        </div>
        <div><h4>Explore</h4><Link to="/results">All properties</Link><Link to="/results?purpose=Sale">Buy</Link><Link to="/results?purpose=Rent">Rent</Link><Link to="/wishlist">Wishlist</Link></div>
        <div><h4>Company</h4><Link to="/about">About KARMA</Link><Link to="/privacy-policy">Privacy Policy</Link><Link to="/about">Contact</Link></div>
        <div><h4>Contact Us</h4>
          <a style={{ fontWeight: '600' }}>Primary Contact:<br/>Zeeshan Ali / Vijina Velikath</a>
          <a href="tel:+919995797450" style={{ fontSize: '18px', fontWeight: '800', color: 'var(--blue)' }}>+91 99957 97450</a>
          <a href="mailto:hello@karmarealestate.in">hello@karmarealestate.in</a>
        </div>
      </div>
      <div className="f-bottom"><div className="f-bottom-in">
        <span>© 2026 KARMA Real Estate Pvt. Ltd. All rights reserved.</span>
        <span><a style={{display:'inline',padding:'0 8px'}}>Privacy Policy</a>·<a style={{display:'inline',padding:'0 8px'}}>Terms</a>·<span style={{padding:'0 8px'}}>K-RERA details shown per listing where registered</span></span>
      </div></div>
    </footer>
  )
}

export default function PublicLayout() {
  return (
    <div style={{ background: 'var(--bg-soft)' }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
