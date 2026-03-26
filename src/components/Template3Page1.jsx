export default function Template3Page1({ formData, updateField, updateServiceRow }) {
  const serviceColumns = [
    { key: 'container', label: 'Container' },
    { key: 'containerSize', label: 'Container Size' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'lifts', label: 'Lifts' },
    { key: 'wasteStream', label: 'Waste Stream' },
  ];

  return (
    <>
      {/* ===== LETTER ===== */}
      <div className="t3-section">
        <div className="t3-letter">
          <span>Dear </span>
          <input type="text" className="t3-inline-input" value={formData.customerName}
            onChange={(e) => updateField('customerName', e.target.value)} />
          <span>,</span>
        </div>
        <div className="t3-letter-body">
          <span>We have pleasure in providing the following quotation which is valid for </span>
          <input type="text" className="t3-inline-input t3-input-xs" value={formData.validDays}
            onChange={(e) => updateField('validDays', e.target.value)} />
          <span> days.</span>
        </div>
      </div>

      {/* ===== SERVICE TABLE ===== */}
      <div className="t3-section">
        <table className="t2-table">
          <thead>
            <tr>
              {serviceColumns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formData.serviceRows.map((row, i) => (
              <tr key={i}>
                {serviceColumns.map((col) => (
                  <td key={col.key}>
                    <input type="text" value={row[col.key]}
                      onChange={(e) => updateServiceRow(i, col.key, e.target.value)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== CONTRACT TERMS ===== */}
      <div className="t3-section">
        <div className="t3-sub-header">Contract Terms:</div>
        <div className="t3-terms-text">
          <input type="text" className="t3-full-input" value={formData.contractTerms}
            onChange={(e) => updateField('contractTerms', e.target.value)} />
        </div>
      </div>

      {/* ===== PRICING ===== */}
      <div className="t3-section">
        <div className="t3-sub-header">Pricing and Service Charges, charges explained</div>
        <div className="t3-pricing-layout">
          <div className="t3-pricing-notes">
            <textarea rows={4} value={formData.pricingNotes}
              onChange={(e) => updateField('pricingNotes', e.target.value)}
              placeholder="Pricing notes..." />
          </div>
          <div className="t3-pricing-summary">
            <table className="t2-field-table">
              <tbody>
                <tr>
                  <td className="t3-price-label">WEEKLY</td>
                  <td className="t3-price-value">
                    <span>£</span>
                    <input type="text" value={formData.weeklyCharge}
                      onChange={(e) => updateField('weeklyCharge', e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td className="t3-price-label">MONTHLY</td>
                  <td className="t3-price-value">
                    <span>£</span>
                    <input type="text" value={formData.monthlyCharge}
                      onChange={(e) => updateField('monthlyCharge', e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td className="t3-price-label">ANNUAL</td>
                  <td className="t3-price-value">
                    <span>£</span>
                    <input type="text" value={formData.annualCharge}
                      onChange={(e) => updateField('annualCharge', e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td className="t3-price-label">VAT at</td>
                  <td className="t3-price-value">
                    <input type="text" value={formData.vatRate}
                      onChange={(e) => updateField('vatRate', e.target.value)} />
                    <span>%</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="t3-direct-debit">AND PAYABLE BY DIRECT DEBIT</div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="t3-section t3-bottom">
        <div className="t3-ready-box">
          <strong>Ready to set up your account?</strong>
        </div>
        <div className="t3-contact-row">
          <div className="t3-contact-item">
            <span className="t3-label">Freephone</span>
            <input type="text" value={formData.freephone}
              onChange={(e) => updateField('freephone', e.target.value)} />
          </div>
          <div className="t3-contact-item">
            <span className="t3-label">E-Mail</span>
            <input type="text" value={formData.email}
              onChange={(e) => updateField('email', e.target.value)} />
          </div>
        </div>
        <div className="t3-acceptance">
          By returning a signed copy you are confirming your acceptance of this quote.
        </div>
      </div>
    </>
  );
}
