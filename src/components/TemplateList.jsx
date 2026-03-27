import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PDFPage1 from './PDFPage1';
import Template2Page1 from './Template2Page1';
import Template3Page1 from './Template3Page1';
import { initialState } from '../hooks/useFormData';
import t2Logo from '../assets/t2-logo.png';

import { initialStateT2 } from '../hooks/useFormDataTemplate2';
import { initialStateT3 } from '../hooks/useFormDataTemplate3';

const API_BASE = `${(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/api`;

const noop = () => {};

function FormPreview({ templateId }) {
  if (templateId === 'nationwide-waste') {
    return (
      <div className="template-preview-wrapper">
        <div className="template-preview-scaler">
          <div className="pdf-page template-preview-page">
            <div className="pdf-header">
              <div className="pdf-logo">
                <div className="logo-graphic">
                  <div className="logo-tri-striped" />
                  <div className="logo-tri-solid" />
                </div>
                <div className="logo-text">
                  <strong>NATIONWIDE WASTE &amp; RECYCLING</strong>
                  <span>RETHINKING THE FUTURE OF WASTE</span>
                </div>
              </div>
              <div className="pdf-company-info">
                <strong>Nationwide Waste &amp; Recycling Limited</strong>
                <span>28 Dunkirk Road, Southport PR8 4RQ</span>
                <span className="link">admin@nationwidewasteandrecycling.co.uk</span>
                <span>Tel: 0800 1123443</span>
              </div>
            </div>
            <div className="pdf-license">
              Registered Waste Carriers License No. CBDU620435
            </div>
            <PDFPage1
              formData={initialState}
              updateField={noop}
              updateNested={noop}
              updateServiceRow={noop}
            />
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'first-mile-wtn') {
    return (
      <div className="template-preview-wrapper">
        <div className="template-preview-scaler">
          <div className="pdf-page template-preview-page">
            <div className="pdf-header t2-header">
              <div className="t2-logo">
                <img src={t2Logo} alt="logo" className="t2-logo-img" />
                <span className="t2-logo-text">Nationwide Waste &amp; Recycling Limited</span>
              </div>
              <div className="t2-header-right">
                <span>Page 1 of 2</span>
              </div>
            </div>
            <div className="t2-title">Season Ticket Waste Transfer Note</div>
            <Template2Page1
              formData={initialStateT2}
              updateField={noop}
              updateNested={noop}
              updateWasteRow={noop}
            />
            <div className="t2-footer" style={{ marginTop: 'auto' }}>
              <span>Nationwide Waste &amp; Recycling Limited</span>
              <span>0800 1123443</span>
              <span>www.nationwidewasteandrecycling.co.uk</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'biffa-quotation') {
    return (
      <div className="template-preview-wrapper">
        <div className="template-preview-scaler">
          <div className="pdf-page template-preview-page t3-page">
            <div className="t3-header">
              <div className="t3-header-left">
                <div className="t3-logo-col">
                  <div className="pdf-logo">
                    <div className="logo-graphic"><div className="logo-tri-striped" /><div className="logo-tri-solid" /></div>
                    <div className="logo-text">
                      <strong>NATIONWIDE WASTE &amp; RECYCLING</strong>
                      <span>RETHINKING THE FUTURE OF WASTE</span>
                    </div>
                  </div>
                </div>
                <div className="t3-title-col">
                  <span className="t3-header-date">13.06.22</span>
                  <div className="t3-title-col-bottom">
                    <h2 className="t3-quote-heading">Quotation</h2>
                    <div className="t3-ref">
                      <span className="t3-label">Ref:</span> 206475
                    </div>
                  </div>
                </div>
              </div>
              <div className="t3-header-right">
                <div className="t3-company-info">
                  <strong>Company Information</strong>
                  <span>Nationwide Waste &amp; Recycling Limited,</span>
                  <span>28 Dunkirk Road, Southport PR8 4RQ</span>
                  <span>&nbsp;</span>
                  <span>VAT No: 513 1751 24</span>
                  <span>Company No: 06745189</span>
                </div>
                <div className="t3-badge-logo">
                  <div className="logo-graphic"><div className="logo-tri-striped" /><div className="logo-tri-solid" /></div>
                </div>
              </div>
            </div>
            <Template3Page1
              formData={initialStateT3}
              updateField={noop}
              updateServiceRow={noop}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function PlaceholderPreview() {
  return (
    <div className="template-preview-wrapper">
      <div className="template-placeholder-preview">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="6" width="40" height="52" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="20" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <line x1="20" y1="26" x2="44" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
          <line x1="20" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
          <rect x="20" y="42" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
}

export default function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/templates`)
      .then((res) => setTemplates(res.data))
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="template-list-page">
      <header className="app-header">
        <h1>Interactive PDF Completion Tool</h1>
        <p>Select a template to get started</p>
      </header>

      <div className="template-list-container">
        {loading ? (
          <div className="template-loading">
            <div className="spinner" />
            <span>Loading templates...</span>
          </div>
        ) : (
          <div className="template-grid">
            {templates.map((t) => (
              <div
                key={t.id}
                className={`template-card${t.disabled ? ' disabled' : ''}`}
                onClick={() => !t.disabled && navigate(`/template/${t.id}`)}
              >
                {t.disabled ? (
                  <PlaceholderPreview />
                ) : (
                  <FormPreview templateId={t.id} />
                )}
                <div className="template-card-body">
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <div className="template-card-footer">
                    {t.pages > 0 && <span className="template-card-pages">{t.pages} pages</span>}
                    {t.disabled && <span className="template-card-badge">Coming Soon</span>}
                    {!t.disabled && <span className="template-card-action">Open &rarr;</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
