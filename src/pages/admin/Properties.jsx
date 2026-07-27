import { useContext, useState, useMemo } from 'react';
import { AppDataContext } from '../../context/AppDataContext';

export default function Properties() {
  const { props } = useContext(AppDataContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({});

  // Table Enhancements State
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const sortedProps = useMemo(() => {
    let sortableProps = [...props];
    sortableProps.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      if (sortConfig.key === 'price') {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortableProps;
  }, [props, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => setSelectedIds(e.target.checked ? props.map(p => p.id) : []);
  const handleSelectOne = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handlePdfClick = (id) => {
    window.open(`/admin/properties/${id}/pdf`, '_blank');
  };

  const openModal = (mode, p = null) => {
    setModalMode(mode);
    setFormData(p || {
      title: '', loc: '', type: 'House', purpose: 'Sale', price: '', 
      area: '', beds: '', status: 'Available', pub: true, imgs: []
    });
    setShowModal(true);
  };
  
  return (
    <div className="admin-theme">
      <div className="panel">
        <div className="panel-hd">
          <div>
            <h3>All properties · {props.length}</h3>
            <p>Whatever the team enters is published directly</p>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <button className="btn btn-ghost btn-sm">Import</button>
            <button className="btn btn-blue btn-sm" onClick={() => openModal('add')}>+ Add property</button>
          </div>
        </div>
        <div className="table-scroll">
          {selectedIds.length > 0 && (
            <div style={{padding: '12px 16px', background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16}}>
              <b>{selectedIds.length} selected</b>
              <button className="btn btn-outline" style={{padding: '4px 8px', fontSize: 13}}>Bulk Delete</button>
              <button className="btn btn-outline" style={{padding: '4px 8px', fontSize: 13}}>Change Status</button>
            </div>
          )}
          <table className="tbl">
            <thead>
              <tr>
                <th style={{width: 40}}><input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === props.length && props.length > 0} /></th>
                <th></th>
                <th onClick={() => requestSort('title')} style={{cursor: 'pointer', userSelect: 'none'}}>Property {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => requestSort('purpose')} style={{cursor: 'pointer', userSelect: 'none'}}>Purpose {sortConfig.key === 'purpose' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => requestSort('price')} style={{cursor: 'pointer', userSelect: 'none'}}>Price {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => requestSort('status')} style={{cursor: 'pointer', userSelect: 'none'}}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th onClick={() => requestSort('pub')} style={{cursor: 'pointer', userSelect: 'none'}}>Published {sortConfig.key === 'pub' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                <th style={{textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProps.map(p => (
                <tr key={p.id} className={selectedIds.includes(p.id) ? 'selected-row' : ''}>
                  <td><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => handleSelectOne(p.id)} /></td>
                  <td><div className="thumb"></div></td>
                  <td className="td-main">
                    <b>{p.title}</b>
                    <span>{p.type} · {p.loc} · listed {p.listed}{p.rera ? ' · K-RERA ✓' : ''}{p.cls ? ' · ' + p.cls : ''}</span>
                  </td>
                  <td>
                    <span className={`pill ${p.purpose === 'Sale' ? 'blue' : p.purpose === 'Rent' ? 'green' : 'amber'}`}>
                      {p.purpose}
                    </span>
                  </td>
                  <td style={{fontWeight: 600, whiteSpace: 'nowrap'}}>₹{p.price} L</td>
                  <td>
                    <select className="pill-sel" defaultValue={p.status}>
                      {['Available','Under Negotiation','Sold','Rented','Leased','Delisted'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <label className="check-line" style={{padding: 0}}>
                      <input type="checkbox" defaultChecked={p.pub} /> 
                      <span style={{fontSize: '12px', color: 'var(--ink-2)'}}>{p.pub ? 'Live' : 'Hidden'}</span>
                    </label>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" title="Preview as customer">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="icon-btn" title="Edit" onClick={() => openModal('edit', p)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                      </button>
                      <button className="icon-btn" title="Generate branded PDF" onClick={() => handlePdfClick(p.id)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5M12 18v-6m0 6-2.5-2.5M12 18l2.5-2.5"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{fontSize: '12px', color: 'var(--ink-2)', padding: '0 4px'}}>
        Branded PDF export creates a shareable brochure with KARMA watermark on photo pages (Section 9.3) — the team downloads and sends it over WhatsApp manually.
      </p>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="overlay" onClick={(e) => e.target.className === 'overlay' && setShowModal(false)} style={{zIndex: 100}}>
          <div className="modal" style={{maxWidth: 600}}>
            <div className="modal-hd">
              <b>{modalMode === 'add' ? 'Add New Property' : 'Edit Property'}</b>
              <button className="modal-x" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-bd" style={{maxHeight: '70vh', overflowY: 'auto'}}>
              <div className="fld">
                <label>Title</label>
                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Modern Villa in Payyambalam" />
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                <div className="fld">
                  <label>Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                    <option>Plot</option>
                  </select>
                </div>
                <div className="fld">
                  <label>Locality</label>
                  <input value={formData.loc} onChange={e => setFormData({...formData, loc: e.target.value})} placeholder="e.g. Thottada" />
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16}}>
                <div className="fld">
                  <label>Purpose</label>
                  <select value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
                    <option>Sale</option>
                    <option>Rent</option>
                    <option>Lease</option>
                  </select>
                </div>
                <div className="fld">
                  <label>Price (Lakhs)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="₹" />
                </div>
                <div className="fld">
                  <label>Area / Land</label>
                  <input value={formData.area || formData.land || ''} onChange={e => setFormData({...formData, area: e.target.value})} placeholder="e.g. 2500 sqft" />
                </div>
              </div>

              <div className="fld" style={{marginTop: 8}}>
                <label>Photos</label>
                <div style={{border: '2px dashed var(--line)', borderRadius: 12, padding: 32, textAlign: 'center', background: 'var(--bg-soft)', cursor: 'pointer', color: 'var(--ink-2)'}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginBottom: 8}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <div style={{fontWeight: 600, color: 'var(--blue)'}}>Click to upload or drag and drop</div>
                  <div style={{fontSize: 13, marginTop: 4}}>PNG, JPG, up to 10MB</div>
                </div>
                {/* Mock existing images */}
                {formData.imgs && formData.imgs.length > 0 && (
                  <div style={{display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4}}>
                    {formData.imgs.map((img, i) => (
                      <div key={i} style={{width: 60, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0, position: 'relative'}}>
                        <img src={img} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        <div style={{position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '50%', width: 16, height: 16, display: 'grid', placeItems: 'center', fontSize: 10, cursor: 'pointer'}}>✕</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#f9fafb'}}>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-blue" onClick={() => setShowModal(false)}>Save Property</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
