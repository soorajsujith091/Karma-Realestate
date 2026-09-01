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
  const [showSellModal, setShowSellModal] = useState(false);
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
      <header className={`hdr ${scrolled ? 'hdr-solid' : 'hdr-transparent'}`} style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="hdr-in">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <div className="logo-mark" style={{ background: 'none', color: 'var(--primary)', boxShadow: 'none' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </div>
            <div className="logo-txt" style={{ color: 'var(--primary)', fontSize: '20px', letterSpacing: '-0.5px' }}><b style={{fontWeight: 800}}>karma</b></div>
          </Link>
          
          <div className="hdr-search-pill" style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--line)', borderRadius: '40px', padding: '8px 8px 8px 24px', boxShadow: 'var(--shadow-1)', cursor: 'pointer', gap: '16px', fontWeight: 600, fontSize: '14px', transition: 'box-shadow 0.2s', margin: '0 auto' }} onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow-2)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'var(--shadow-1)'}>
            <Link to="/results" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Anywhere</Link>
            <div style={{ width: 1, height: 24, background: 'var(--line)' }}></div>
            <Link to="/results" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Any property</Link>
            <div style={{ width: 1, height: 24, background: 'var(--line)' }}></div>
            <Link to="/results" style={{ textDecoration: 'none', color: 'var(--ink-2)', fontWeight: 400 }}>Add budget</Link>
            <Link to="/results" style={{ background: 'var(--primary)', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', marginLeft: 8, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </Link>
          </div>
          
          <div className="hdr-right" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => setShowSellModal(true)} style={{ fontWeight: 600, padding: '12px 16px', borderRadius: '24px', fontSize: '14px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-soft)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>Karma your home</button>
            <button style={{ padding: '12px', borderRadius: '50%', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-soft)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            </button>
            <div className="hdr-user-pill" style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--line)', padding: '6px 6px 6px 14px', borderRadius: '30px', cursor: 'pointer', transition: 'box-shadow 0.2s', marginLeft: 8, background: '#fff' }} onClick={() => user ? setUser(null) : setShowAuthModal(true)} onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow-1)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              <div style={{ background: 'var(--ink-2)', color: '#fff', width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                {user ? user.name.charAt(0).toUpperCase() : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>}
              </div>
            </div>
            <button className="pub-menu-btn" onClick={() => setShowMobileMenu(true)} style={{ display: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
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
          <button className="pub-side-link" onClick={() => { setShowMobileMenu(false); setShowSellModal(true); }} style={{ color: 'var(--blue)', background: 'var(--accent-soft)' }}>Sell Property</button>
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
      {showSellModal && (
        <div className="overlay" style={{zIndex: 101}} onClick={(e) => e.target.className.includes('overlay') && setShowSellModal(false)}>
          <div className="modal" style={{maxWidth: 400}}>
            <div className="modal-hd">
              <b>List Your Property</b>
              <button className="modal-x" onClick={() => setShowSellModal(false)}>✕</button>
            </div>
            <div className="modal-bd" style={{textAlign: 'center'}}>
              <div className="m-ic" style={{background: 'rgba(26, 77, 143, 0.1)', color: 'var(--blue)', margin: '0 auto 16px', width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 7v14M21 7v14M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6"/></svg>
              </div>
              <h3 style={{fontSize: 20, fontWeight: 800, marginBottom: 8}}>Ready to sell or rent?</h3>
              <p style={{color: 'var(--ink-2)', fontSize: 14.5, marginBottom: 24, lineHeight: 1.5}}>
                Get your property listed on KARMA Real Estate and reach thousands of potential buyers and tenants. Contact our experts today!
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <a href="https://wa.me/919995797450?text=Hello%20KARMA%20Real%20Estate,%20I%20would%20like%20to%20list%20my%20property." target="_blank" rel="noreferrer" style={{background: '#25D366', color: '#fff', fontWeight: 600, padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'filter 0.2s'}} onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.95)'} onMouseOut={e => e.currentTarget.style.filter = 'none'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2.01a10 10 0 0 0-8.52 15.27L2 22l4.87-1.46a10 10 0 1 0 5.14-18.53zm0 18A8 8 0 0 1 7.2 18.9l-.35-.2-3.6 1.08 1.1-3.5-.2-.36A8 8 0 1 1 12.01 20zm4.27-5.83c-.23-.12-1.38-.68-1.59-.76-.22-.08-.38-.12-.54.12s-.6 .76-.74.92c-.14.16-.27.18-.5.06a6.56 6.56 0 0 1-1.92-1.18 7.2 7.2 0 0 1-1.33-1.66c-.14-.24-.01-.37.1-.49.1-.11.23-.27.35-.4a1.6 1.6 0 0 0 .15-.25c.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.47-.4-.4-.54-.41-.14 0-.3-.01-.46-.01a.89.89 0 0 0-.64.3c-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.12 3.64 1.48.64 2.15.7 2.94.59.56-.08 1.38-.56 1.57-1.1.2-.54.2-.1.14-.11z"/></svg>
                  Chat on WhatsApp
                </a>
                <a href="tel:+919995797450" style={{background: 'var(--blue)', color: '#fff', fontWeight: 600, padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={e => e.currentTarget.style.background = 'var(--blue-d)'} onMouseOut={e => e.currentTarget.style.background = 'var(--blue)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call +91 99957 97450
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
    <footer className="footer" style={{ borderTop: '1px solid var(--line)', background: '#F7F7F7', padding: '24px', color: 'var(--ink)' }}>
      <div className="f-bottom" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>© 2026 Karma, Inc.</span>
          <span>·</span>
          <Link to="/privacy-policy" style={{ color: 'var(--ink)', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>Privacy</Link>
          <span>·</span>
          <span style={{ cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>Terms</span>
          <span>·</span>
          <Link to="/about" style={{ color: 'var(--ink)', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>Sitemap</Link>
          <span>·</span>
          <span style={{ cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>Company details</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            English (IN)
          </div>
          <div style={{ cursor: 'pointer' }}>₹ INR</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            Support & resources
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
          </div>
        </div>
      </div>
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
