import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import PDFPage1 from './components/PDFPage1';
import PDFPage2 from './components/PDFPage2';
import Template2Page1 from './components/Template2Page1';
import Template2Page2 from './components/Template2Page2';
import PdfPreview from './components/PdfPreview';
import { useFormData } from './hooks/useFormData';
import { useFormDataTemplate2 } from './hooks/useFormDataTemplate2';
import t2Logo from './assets/t2-logo.png';
import { getTemplateUrl } from './utils/api';

function Template1Form() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    formData, isSubmitting, isPreviewing, previewUrl, downloadUrl, error,
    updateField, updateNested, updateServiceRow, previewForm, submitForm, resetForm,
  } = useFormData();

  useEffect(() => { previewForm(); }, []);

  const handleSubmit = (e) => { e.preventDefault(); submitForm(); };

  const toolbar = (
    <div className="form-toolbar">
      <div className="page-nav">
        <button type="button" className={`page-nav-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>Page 1</button>
        <button type="button" className={`page-nav-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>Page 2</button>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-preview" disabled={isPreviewing} onClick={previewForm}>{isPreviewing ? 'Loading...' : 'Preview PDF'}</button>
        <button type="button" className="btn-primary" disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Generating...' : 'Generate & Download'}</button>
        <button type="button" className="btn-secondary" onClick={resetForm}>Reset</button>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <div className="form-panel">
        {toolbar}
        <form onSubmit={handleSubmit}>
          <div className="pdf-page">
            <div className="pdf-header">
              <div className="pdf-logo">
                <div className="logo-graphic"><div className="logo-tri-striped" /><div className="logo-tri-solid" /></div>
                <div className="logo-text"><strong>NATIONWIDE WASTE &amp; RECYCLING</strong><span>RETHINKING THE FUTURE OF WASTE</span></div>
              </div>
              <div className="pdf-company-info">
                <strong>Nationwide Waste &amp; Recycling Limited</strong>
                <span>28 Dunkirk Road, Southport PR8 4RQ</span>
                <span className="link">admin@nationwidewasteandrecycling.co.uk</span>
                <span>Tel: 0800 1123443</span>
              </div>
            </div>
            <div className="pdf-license">Registered Waste Carriers License No. CBDU620435</div>
            {currentPage === 1 ? (
              <PDFPage1 formData={formData} updateField={updateField} updateNested={updateNested} updateServiceRow={updateServiceRow} />
            ) : (
              <PDFPage2 formData={formData} updateField={updateField} updateNested={updateNested} />
            )}
          </div>
          {toolbar}
          {error && <div className="error-message">{error}</div>}
          {downloadUrl && (
            <div className="success-message">
              <p>PDF generated successfully!</p>
              <a href={downloadUrl} className="btn-download" download>Download Completed PDF</a>
            </div>
          )}
        </form>
      </div>
      <div className="preview-panel">
        <h2>PDF Preview</h2>
        {isPreviewing && <div className="preview-loading"><div className="spinner" /><span>Generating preview...</span></div>}
        <PdfPreview pdfUrl={previewUrl || downloadUrl || getTemplateUrl()} />
      </div>
    </div>
  );
}

function Template2Form() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    formData, isSubmitting, isPreviewing, previewUrl, downloadUrl, error,
    updateField, updateNested, updateWasteRow, previewForm, submitForm, resetForm,
  } = useFormDataTemplate2();

  useEffect(() => { previewForm(); }, []);

  const handleSubmit = (e) => { e.preventDefault(); submitForm(); };

  const toolbar = (
    <div className="form-toolbar">
      <div className="page-nav">
        <button type="button" className={`page-nav-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>Page 1</button>
        <button type="button" className={`page-nav-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>Page 2</button>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-preview" disabled={isPreviewing} onClick={previewForm}>{isPreviewing ? 'Loading...' : 'Preview PDF'}</button>
        <button type="button" className="btn-primary" disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Generating...' : 'Generate & Download'}</button>
        <button type="button" className="btn-secondary" onClick={resetForm}>Reset</button>
      </div>
    </div>
  );

  return (
    <div className="app-layout">
      <div className="form-panel">
        {toolbar}
        <form onSubmit={handleSubmit}>
          <div className="pdf-page t2-page">
            <div className="pdf-header t2-header">
              <div className="t2-logo">
                <img src={t2Logo} alt="logo" className="t2-logo-img" />
                <span className="t2-logo-text">Nationwide Waste &amp; Recycling Limited</span>
              </div>
              <div className="t2-header-right">
                <span>Page {currentPage} of 2</span>
                <span>Season Ticket WTN - Zia Lucia</span>
                <span>(Holloway Road) - 20-01-2026</span>
              </div>
            </div>
            <div className="t2-title">Season Ticket Waste Transfer Note</div>
            {currentPage === 1 ? (
              <Template2Page1 formData={formData} updateField={updateField} updateNested={updateNested} updateWasteRow={updateWasteRow} />
            ) : (
              <Template2Page2 formData={formData} updateField={updateField} />
            )}
            <div className="t2-footer">
              <span>First Mile Limited</span>
              <span>0333 300 3448</span>
              <span>www.thefirstmile.co.uk</span>
            </div>
          </div>
          {toolbar}
          {error && <div className="error-message">{error}</div>}
          {downloadUrl && (
            <div className="success-message">
              <p>PDF generated successfully!</p>
              <a href={downloadUrl} className="btn-download" download>Download Completed PDF</a>
            </div>
          )}
        </form>
      </div>
      <div className="preview-panel">
        <h2>PDF Preview</h2>
        {isPreviewing && <div className="preview-loading"><div className="spinner" /><span>Generating preview...</span></div>}
        <PdfPreview pdfUrl={previewUrl || downloadUrl} />
      </div>
    </div>
  );
}

function App() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="app-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          &larr; Back to Templates
        </button>
        <h1>Interactive PDF Completion Tool</h1>
        <p>Fill in the form below to generate a completed PDF</p>
      </header>

      {templateId === 'first-mile-wtn' ? <Template2Form /> : <Template1Form />}
    </div>
  );
}

export default App;
