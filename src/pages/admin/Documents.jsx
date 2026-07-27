import { useContext, useState } from 'react';
import { AppDataContext } from '../../context/AppDataContext';

export default function Documents() {
  const { props, docs, remarks, setRemarks } = useContext(AppDataContext);
  
  const withDocs = props.filter(p => docs[p.id] || remarks[p.id] !== undefined);
  const [activePropId, setActivePropId] = useState(withDocs[0]?.id || props[0]?.id);
  
  const p = props.find(x => x.id === activePropId) || withDocs[0] || props[0];
  const pDocs = docs[p?.id] || [];

  return (
    <div className="admin-theme">
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {withDocs.map(x => (
          <button 
            key={x.id}
            className={`fchip ${x.id === p?.id ? 'on' : ''}`} 
            onClick={() => setActivePropId(x.id)}
          >
            {x.title.split(',')[0]}
          </button>
        ))}
      </div>
      
      {p && (
        <div className="panel">
          <div className="panel-hd">
            <div>
              <h3>{p.title}</h3>
              <p>Stored privately — never in public HTML, APIs or search (Section 7.4)</p>
            </div>
            <button className="btn btn-blue btn-sm">+ Upload document</button>
          </div>
          
          {pDocs.length ? pDocs.map((d, i) => (
            <div key={i} className="doc-row">
              <div className={`doc-ic ${d.k === 'img' ? 'img' : ''}`}>
                {d.k === 'img' ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L5 22"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/>
                  </svg>
                )}
              </div>
              <div className="doc-main">
                <b>{d.n}</b>
                <span>{d.s}</span>
              </div>
              <span className="wm-tag">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg> 
                Watermarked
              </span>
              <div className="row-actions">
                <button className="icon-btn" title="View (logged)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button className="icon-btn" title="Download (logged)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
                </button>
              </div>
            </div>
          )) : (
            <div className="empty">
              <b>No documents yet</b>
              Upload title deeds, EC, tax receipts — watermarking is automatic.
            </div>
          )}
          
          <div className="remarks">
            <h5>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg> 
              Internal remarks — admin only
            </h5>
            <textarea 
              value={remarks[p.id] || ''}
              onChange={e => setRemarks({...remarks, [p.id]: e.target.value})}
              placeholder="e.g. Owner open to 5% negotiation…"
            />
          </div>
        </div>
      )}
    </div>
  );
}
