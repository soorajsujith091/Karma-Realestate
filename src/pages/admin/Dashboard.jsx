import { useContext } from 'react';
import { AppDataContext } from '../../context/AppDataContext';
import { Link } from 'react-router-dom';

function statusPill(s) {
  const m = {
    'New': 'blue', 'Contacted': 'amber', 'Interested': 'green', 
    'Not Interested': 'gray', 'Closed': 'purple', 'Available': 'green', 
    'Under Negotiation': 'amber', 'Sold': 'red', 'Rented': 'red', 
    'Leased': 'red', 'Delisted': 'gray'
  };
  return <span className={`pill ${m[s] || 'gray'}`}><i></i>{s}</span>;
}

export default function Dashboard() {
  const { props, leads } = useContext(AppDataContext);
  
  const newL = leads.filter(l => l.status === 'New');
  
  return (
    <div className="admin-theme">
      <div className="stat-row">
        <Link to="/admin/properties" className="stat">
          <div className="s-top">
            <div className="s-ic" style={{background: 'var(--accent-soft)', color: 'var(--blue)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10"/></svg>
            </div>
            <span className="delta up">+2 this week</span>
          </div>
          <b>{props.filter(p => p.pub && p.status !== 'Sold').length}</b>
          <span>Live listings</span>
        </Link>
        
        <Link to="/admin/crm" className="stat">
          <div className="s-top">
            <div className="s-ic" style={{background: 'var(--red-soft)', color: 'var(--red)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/></svg>
            </div>
            {newL.length > 0 && <span className="delta warn">Needs follow-up</span>}
          </div>
          <b>{newL.length}</b>
          <span>New leads to contact</span>
        </Link>
        
        <Link to="/admin/crm" className="stat">
          <div className="s-top">
            <div className="s-ic" style={{background: 'var(--amber-soft)', color: 'var(--amber)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>
            </div>
          </div>
          <b>{leads.filter(l => l.src === 'Site visit request').length}</b>
          <span>Site visits requested</span>
        </Link>
        
        <Link to="/admin/properties" className="stat">
          <div className="s-top">
            <div className="s-ic" style={{background: 'var(--green-soft)', color: 'var(--green)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <span className="delta up">₹{props.filter(p=>p.status==='Sold').reduce((sum, p) => sum + parseFloat(p.price), 0)} L value</span>
          </div>
          <b>{props.filter(p => p.status === 'Sold').length}</b>
          <span>Properties sold via KARMA</span>
        </Link>
      </div>
      
      <div className="panel">
        <div className="panel-hd">
          <div><h3>Newest leads</h3><p>Captured automatically at OTP unlock — check daily</p></div>
          <Link to="/admin/crm" className="btn btn-ghost btn-sm">Open CRM</Link>
        </div>
        <div className="table-scroll">
          <table className="tbl">
            <thead><tr><th>Customer</th><th>Interested in</th><th>Source</th><th>Status</th></tr></thead>
          <tbody>
            {leads.length > 0 ? leads.slice(0, 4).map(l => (
              <tr key={l.id}>
                <td className="td-main"><b>{l.name}</b><span>{l.phone} · {l.loc}</span></td>
                <td style={{fontSize: '12.5px', color: 'var(--ink-3)'}}>
                  {l.props[0]}
                  {l.props.length > 1 && <span style={{color: 'var(--ink-2)'}}> +{l.props.length - 1}</span>}
                </td>
                <td><span className={`pill ${l.src === 'Site visit request' ? 'amber' : 'gray'}`}>{l.src}</span></td>
                <td>{statusPill(l.status)}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '24px', color: 'var(--ink-2)'}}>No new leads</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      
      <div className="panel">
        <div className="panel-hd">
          <div><h3>Listing performance</h3><p>Views and captured leads per property</p></div>
          <Link to="/admin/properties" className="btn btn-ghost btn-sm">All properties</Link>
        </div>
        <div className="table-scroll">
          <table className="tbl">
            <thead><tr><th>Property</th><th>Views</th><th>Leads</th><th>Status</th></tr></thead>
          <tbody>
            {props.length > 0 ? [...props].sort((a, b) => b.views - a.views).slice(0, 4).map(p => (
              <tr key={p.id}>
                <td className="td-main"><b>{p.title}</b><span>{p.loc} · ₹{p.price} L</span></td>
                <td><b>{p.views}</b></td>
                <td><b>{p.leads}</b></td>
                <td>{statusPill(p.status)}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '24px', color: 'var(--ink-2)'}}>No properties listed</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
