export default function Template3Page1({ formData, updateField, updateServiceRow }) {
  const serviceColumns = [
    { key: 'item', label: 'Item', width: '4%' },
    { key: 'wasteType', label: 'Waste Type', width: '12%' },
    { key: 'containerSizeType', label: 'Container\nSize & Type', width: '14%' },
    { key: 'qty', label: 'Qty', width: '4%' },
    { key: 'collectionFreq', label: 'Collection\nFrequency', width: '10%' },
    { key: 'weightLimit', label: 'Weight\nLimit *', width: '8%' },
    { key: 'liftRate', label: 'Lift Rate /\nHaulage †', width: '10%' },
    { key: 'priceTonne', label: 'Price\nper\nTonne', width: '8%' },
    { key: 'dailyRental', label: 'Daily\nContainer\nRental', width: '9%' },
    { key: 'wtnCharge', label: 'WTN\nStandard\nCharge ‡', width: '9%' },
    { key: 'totalWeekly', label: 'Total Weekly\nPrice', width: '12%' },
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

      {/* ===== ADDRESS & CONTRACT ===== */}
      <div className="t3-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td className="t3-info-label">Waste Collection Address</td>
              <td className="t3-info-value">
                <input type="text" value={formData.wasteCollectionAddress}
                  onChange={(e) => updateField('wasteCollectionAddress', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t3-info-label">Contract Term</td>
              <td className="t3-info-value">
                <input type="text" value={formData.contractTerm}
                  onChange={(e) => updateField('contractTerm', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== SERVICE TABLE ===== */}
      <div className="t3-section">
        <table className="t3-service-table">
          <thead>
            <tr>
              {serviceColumns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>{col.label}</th>
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

      {/* ===== PRICING ===== */}
      <div className="t3-section">
        <div className="t3-pricing-layout">
          <div className="t3-pricing-notes">
            <div className="t3-pricing-title">Pricing and Service Charges, simply explained</div>
            <textarea className="t3-pricing-textarea" rows={5} value={formData.pricingNotes}
              onChange={(e) => updateField('pricingNotes', e.target.value)} />
          </div>
          <div className="t3-pricing-summary">
            <div className="t3-price-row t3-price-row-large">
              <span className="t3-price-label-text">WEEKLY</span>
              <span className="t3-price-amount-large">£<input type="text" value={formData.weeklyCharge}
                onChange={(e) => updateField('weeklyCharge', e.target.value)} /></span>
            </div>
            <div className="t3-price-row">
              <span className="t3-price-label-text">MONTHLY</span>
              <span className="t3-price-amount">£<input type="text" value={formData.monthlyCharge}
                onChange={(e) => updateField('monthlyCharge', e.target.value)} /></span>
            </div>
            <div className="t3-price-row">
              <span className="t3-price-label-text">ANNUAL</span>
              <span className="t3-price-amount">£<input type="text" value={formData.annualCharge}
                onChange={(e) => updateField('annualCharge', e.target.value)} /></span>
            </div>
            <div className="t3-vat-debit">
              ALL RATES ARE SUBJECT TO VAT<br />
              AND PAYABLE BY DIRECT DEBIT
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="t3-section t3-bottom">
        <div className="t3-bottom-row">
          <div className="t3-ready-box">
            <strong>Ready to set up<br />your account?</strong>
          </div>
          <div className="t3-contact-box">
            <div className="t3-contact-title">Freephone</div>
            <div className="t3-contact-highlight">
              <input type="text" value={formData.freephone}
                onChange={(e) => updateField('freephone', e.target.value)} />
            </div>
            <div className="t3-contact-sub">
              <textarea rows={2} value={formData.freephoneHours}
                onChange={(e) => updateField('freephoneHours', e.target.value)} />
            </div>
          </div>
          <div className="t3-contact-box">
            <div className="t3-contact-title">E-Mail</div>
            <div className="t3-contact-highlight">
              <input type="text" value={formData.email}
                onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div className="t3-contact-sub">
              <textarea rows={2} value={formData.emailNote}
                onChange={(e) => updateField('emailNote', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
