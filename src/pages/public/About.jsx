import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.message) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us | KARMA Real Estate Kannur</title>
        <meta name="description" content="KARMA Real Estate is Kannur's most trusted property partner since 2012. Building trust and delivering dreams with complete transparency." />
      </Helmet>
      <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" style={{ background: 'var(--blue)', color: '#fff', padding: '160px 24px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Building Trust, <br/>Delivering Dreams.
          </h1>
          <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', opacity: 0.9, lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
            KARMA Real Estate has been Kannur’s most trusted property partner since 2012. We believe in complete transparency and honest advice.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ maxWidth: 1200, margin: '-40px auto 80px', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, background: '#fff', padding: 40, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--blue)', marginBottom: 8 }}>1.2k+</div>
            <div style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Happy Families</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--blue)', marginBottom: 8 }}>850+</div>
            <div style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Verified Properties</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--blue)', marginBottom: 8 }}>12</div>
            <div style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Years of Trust</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--blue)', marginBottom: 8 }}>4.9</div>
            <div style={{ color: 'var(--ink-2)', fontWeight: 600 }}>Star Rating</div>
          </div>
        </div>
      </section>

      {/* Story & Branches */}
      <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60 }}>
          <div>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: 36, color: 'var(--ink)', marginBottom: 24 }}>Our Story</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              What started as a small two-person team in Thottada has grown into Kannur's premier real estate consultancy. We realized early on that buying property was often stressful and opaque.
            </p>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.8 }}>
              Our mission is to simplify the property journey. Every property listed on KARMA is physically verified by our team, ensuring you get exactly what you see. No hidden fees, no fake listings.
            </p>
          </div>
          <div>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: 36, color: 'var(--ink)', marginBottom: 24 }}>Our Branches</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--line)', background: '#fff' }}>
                <b style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Kannur Head Office</b>
                <p style={{ color: 'var(--ink-2)', fontSize: 15, margin: '0 0 12px' }}>2nd Floor, KARMA Tower, Fort Road, Kannur 670001</p>
                <div style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>+91 98460 12345</div>
              </div>
              <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--line)', background: '#fff' }}>
                <b style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Thalassery Branch</b>
                <p style={{ color: 'var(--ink-2)', fontSize: 15, margin: '0 0 12px' }}>Ground Floor, Pearl Complex, Logans Road, Thalassery 670101</p>
                <div style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>+91 98460 54321</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ background: 'var(--bg-soft)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 48, borderRadius: 24, boxShadow: 'var(--shadow-3)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: 32, color: 'var(--ink)', marginBottom: 12 }}>Get in Touch</h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 16 }}>Have a question? Drop us a message and we'll get back to you within 24 hours.</p>
          </div>
          
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="m-ic" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', margin: '0 auto 20px', width: 64, height: 64 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 15 }}>Thank you for reaching out. We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="fld">
                <label>Name</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" />
              </div>
              <div className="fld">
                <label>Email Address</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
              </div>
              <div className="fld">
                <label>Message</label>
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help you?" style={{ width: '100%', minHeight: 120, border: '1.5px solid var(--line)', borderRadius: 12, padding: 14, fontSize: 14.5, fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-blue" style={{ width: '100%', marginTop: 12, fontSize: 16, padding: '14px' }}>Send Message</button>
            </form>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
