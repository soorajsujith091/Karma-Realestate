import { useContext, useState } from 'react';
import { AppDataContext } from '../../context/AppDataContext';

function statusPill(s) {
  const m = {
    'New': 'blue', 'Contacted': 'amber', 'Interested': 'green', 
    'Not Interested': 'gray', 'Closed': 'purple', 'Available': 'green', 
    'Under Negotiation': 'amber', 'Sold': 'red', 'Rented': 'red', 
    'Leased': 'red', 'Delisted': 'gray'
  };
  return <span className={`pill ${m[s] || 'gray'}`}><i></i>{s}</span>;
}

export default function CRM() {
  const { leads } = useContext(AppDataContext);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const F = ['All', 'New', 'Contacted', 'Interested', 'Not Interested', 'Closed'];
  
  let list = leads.filter(l => filter === 'All' || l.status === filter);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.phone.includes(q) || 
      l.props.join(' ').toLowerCase().includes(q)
    );
  }

  return (
    <div className="admin-theme">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div className="chip-row">
          {F.map(f => (
            <button 
              key={f}
              className={`fchip ${filter === f ? 'on' : ''}`} 
              onClick={() => setFilter(f)}
            >
              {f}{f === 'All' ? ` · ${leads.length}` : ''}
            </button>
          ))}
        </div>
        <div className="search-in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <input 
            placeholder="Search name, phone, property" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
          />
        </div>
      </div>
      
      <div className="panel">
        {list.length ? (
          <div className="table-scroll">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>First seen</th>
                  <th>Properties viewed</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map(l => (
                  <tr key={l.id} onClick={() => setSelectedLead(l)} style={{cursor: 'pointer'}}>
                    <td className="td-main">
                      <b>{l.name}</b>
                      <span>{l.phone} · {l.loc}</span>
                    </td>
                    <td style={{ fontSize: '12.5px', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                      {l.first}
                    </td>
                    <td style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>
                      {l.props[0]}
                      {l.props.length > 1 && <span style={{ color: 'var(--ink-2)' }}> +{l.props.length - 1} more</span>}
                    </td>
                    <td>
                      <span className={`pill ${l.src === 'Site visit request' ? 'amber' : 'gray'}`}>
                        {l.src}
                      </span>
                    </td>
                    <td>{statusPill(l.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <b>No leads match</b>
            Try a different status filter or search term.
          </div>
        )}
      </div>
      
      <p style={{ fontSize: '12px', color: 'var(--ink-2)', padding: '0 4px' }}>
        Leads appear here the moment a customer verifies OTP or requests a site visit — no SMS/WhatsApp push costs (Section 6.3). The red badge on the sidebar is your free in-app alert.
      </p>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="drawer-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-hd">
              <h3>Lead Details</h3>
              <button className="icon-btn" onClick={() => setSelectedLead(null)}>✕</button>
            </div>
            <div className="drawer-bd">
              <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
                <div style={{width: 56, height: 56, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 700}}>
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{fontSize: 20, marginBottom: 4}}>{selectedLead.name}</h2>
                  <div style={{color: 'var(--ink-2)', fontSize: 14}}>{selectedLead.phone} · {selectedLead.loc}</div>
                </div>
              </div>

              <div className="fld">
                <label>Status</label>
                <select defaultValue={selectedLead.status} style={{maxWidth: 200}}>
                  {F.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{marginTop: 32}}>
                <h4 style={{fontSize: 14, fontWeight: 700, marginBottom: 12, borderBottom: '1px solid var(--line)', paddingBottom: 8}}>Properties of Interest</h4>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {selectedLead.props.map((p, i) => (
                    <li key={i} style={{padding: '12px 0', borderBottom: '1px solid var(--line)', fontSize: 14, color: 'var(--blue)'}}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{marginTop: 32}}>
                <h4 style={{fontSize: 14, fontWeight: 700, marginBottom: 12, borderBottom: '1px solid var(--line)', paddingBottom: 8}}>Activity</h4>
                <div style={{display: 'flex', gap: 12, marginBottom: 16}}>
                  <div style={{width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', fontSize: 12}}>🎯</div>
                  <div>
                    <div style={{fontSize: 14, fontWeight: 600}}>Lead Captured</div>
                    <div style={{fontSize: 13, color: 'var(--ink-2)'}}>Via {selectedLead.src}</div>
                    <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 4}}>{selectedLead.first}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drawer-ft">
              <button className="btn btn-outline" style={{flex: 1}} onClick={() => setSelectedLead(null)}>Close</button>
              <a href={`tel:${selectedLead.phone}`} className="btn btn-blue" style={{flex: 1}}>Call Lead</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
