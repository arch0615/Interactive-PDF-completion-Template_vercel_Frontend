import { useRef, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function SignatureField({ label, value, onChange }) {
  const sigRef = useRef(null);

  const handleEnd = useCallback(() => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      onChange(sigRef.current.toDataURL('image/png'));
    }
  }, [onChange]);

  const handleClear = useCallback(() => {
    sigRef.current?.clear();
    onChange(null);
  }, [onChange]);

  return (
    <div className="pdf-signature-field">
      <span className="pdf-label">{label}</span>
      <div className="pdf-signature-box">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ className: 'pdf-signature-canvas', width: 280, height: 60 }}
          onEnd={handleEnd}
        />
      </div>
      <button type="button" className="pdf-sig-clear" onClick={handleClear}>Clear</button>
    </div>
  );
}

export default function PDFPage2({ formData, updateField, updateNested }) {
  const wasteTypesRow1 = [
    { key: 'paperCardboard', label: 'Paper/cardboard', code: '20.01.01' },
    { key: 'glass', label: 'Glass', code: '20.01.02' },
    { key: 'plastics', label: 'Plastics', code: '20.01.39' },
    { key: 'metals', label: 'Metals', code: '20.01.40' },
  ];
  const wasteTypesRow2 = [
    { key: 'wood', label: 'Wood', code: '20.01.38' },
    { key: 'cateringWaste', label: 'Catering Waste', code: '20.01.08' },
    { key: 'mixedMunicipalWaste', label: 'Mixed municipal waste', code: '20.03.01' },
  ];

  const recoveredRow1 = [
    { key: 'paper', label: 'Paper' },
    { key: 'glass', label: 'Glass' },
    { key: 'plastic', label: 'Plastic' },
    { key: 'metals', label: 'Metals' },
  ];
  const recoveredRow2 = [
    { key: 'wood', label: 'Wood' },
    { key: 'food', label: 'Food' },
    { key: 'greenwaste', label: 'Greenwaste' },
    { key: 'weee', label: 'WEEE' },
  ];

  const hsQuestions = [
    { key: 'clearAccess', label: 'Is there a clear access' },
    { key: 'wellLit', label: 'Is the area well lit' },
    { key: 'reverseInOut', label: 'Does the vehicle have to reverse in/out of the site' },
    { key: 'overheadCablesNarrowGateways', label: 'Are there any overhead cables or narrow gateways' },
    { key: 'gravelCobbles', label: 'Gravel/cobbles etc.' },
    { key: 'vehicleInView', label: 'Is the vehicle in view of operatives when waste is being collected' },
    { key: 'excessWalking', label: 'Does the collection involve excess walking' },
    { key: 'publicStaffAnimals', label: 'Members of the public/staff/animals' },
  ];

  return (
    <>
      {/* ===== INVOICING & PAYMENT BOX ===== */}
      <table className="pdf-inv-table">
        <tbody>
          <tr>
            <td className="pdf-inv-td pdf-inv-no-bottom" colSpan={2}>
              <label className="pdf-checkbox-label">
                <span>Electronic invoicing (check if yes,</span>
                <input type="checkbox" className="pdf-checkbox"
                  checked={formData.electronicInvoicing}
                  onChange={(e) => updateField('electronicInvoicing', e.target.checked)}
                />
                <span>)</span>
              </label>
            </td>
            <td className="pdf-inv-td pdf-inv-no-bottom">
              <span className="pdf-label-static">Initial service term</span>
            </td>
            <td className="pdf-inv-td" rowSpan={2}>
              <div className="pdf-inv-payment">
                <label className="pdf-checkbox-label">
                  <input type="checkbox" className="pdf-checkbox"
                    checked={!!formData.paymentMethod.directDebit}
                    onChange={(e) => updateNested('paymentMethod', 'directDebit', e.target.checked)}
                  />
                  <span>Direct Debit</span>
                </label>
                <label className="pdf-checkbox-label">
                  <input type="checkbox" className="pdf-checkbox"
                    checked={!!formData.paymentMethod.standardCredit}
                    onChange={(e) => updateNested('paymentMethod', 'standardCredit', e.target.checked)}
                  />
                  <span>Standard credit</span>
                </label>
                <div className="pdf-inv-advance-row">
                  <label className="pdf-checkbox-label">
                    <input type="checkbox" className="pdf-checkbox"
                      checked={!!formData.paymentMethod.inAdvance}
                      onChange={(e) => updateNested('paymentMethod', 'inAdvance', e.target.checked)}
                    />
                    <span>In advance</span>
                  </label>
                  <input type="text" className="pdf-inv-weeks-input"
                    value={formData.inAdvanceWeeks}
                    onChange={(e) => updateField('inAdvanceWeeks', e.target.value)}
                  />
                  <span className="pdf-label-static">Weeks</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="pdf-inv-td pdf-inv-no-top" colSpan={2}>
              <label className="pdf-field" style={{ flex: 1 }}>
                <span className="pdf-label">Email address</span>
                <input type="email"
                  value={formData.electronicInvoicingEmail}
                  onChange={(e) => updateField('electronicInvoicingEmail', e.target.value)}
                />
              </label>
            </td>
            <td className="pdf-inv-td pdf-inv-no-top">
              <div className="pdf-inv-weeks-cell">
                <input type="text" className="pdf-inv-weeks-input"
                  value={formData.initialServiceTermWeeks}
                  onChange={(e) => updateField('initialServiceTermWeeks', e.target.value)}
                />
                <span className="pdf-label-static">Week(s)</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="pdf-note">Standard credit means payment is due 7 days from invoice date.</p>

      {/* ===== WASTE SCHEDULE ===== */}
      <div className="pdf-section-header">
        Waste Schedule (waste types described by the European Waste Catalogue)
      </div>
      <div className="pdf-section">
        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Producer</span>
            <input type="text"
              value={formData.producer}
              onChange={(e) => updateField('producer', e.target.value)}
            />
          </label>
        </div>
        <div className="pdf-row">
          <label className="pdf-field flex-2">
            <span className="pdf-label">Waste process</span>
            <input type="text"
              value={formData.wasteProcess}
              onChange={(e) => updateField('wasteProcess', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">transfer note from</span>
            <input type="text"
              value={formData.transferNoteFrom}
              onChange={(e) => updateField('transferNoteFrom', e.target.value)}
            />
          </label>
          <label className="pdf-field" style={{ flex: 'none' }}>
            <span className="pdf-label">to</span>
            <input type="text" style={{ width: '100px' }}
              value={formData.transferNoteTo}
              onChange={(e) => updateField('transferNoteTo', e.target.value)}
            />
          </label>
        </div>

        {/* Waste types - row 1 */}
        <div className="pdf-waste-row">
          {wasteTypesRow1.map((wt) => (
            <label key={wt.key} className="pdf-waste-item">
              <div className="pdf-waste-check-row">
                <input type="checkbox" className="pdf-checkbox"
                  checked={!!formData.wasteTypes[wt.key]}
                  onChange={(e) => updateNested('wasteTypes', wt.key, e.target.checked)}
                />
                <span>{wt.label}</span>
              </div>
              <span className="pdf-waste-code">{wt.code}</span>
            </label>
          ))}
        </div>
        {/* Waste types - row 2 */}
        <div className="pdf-waste-row">
          {wasteTypesRow2.map((wt) => (
            <label key={wt.key} className="pdf-waste-item">
              <div className="pdf-waste-check-row">
                <input type="checkbox" className="pdf-checkbox"
                  checked={!!formData.wasteTypes[wt.key]}
                  onChange={(e) => updateNested('wasteTypes', wt.key, e.target.checked)}
                />
                <span>{wt.label}</span>
              </div>
              <span className="pdf-waste-code">{wt.code}</span>
            </label>
          ))}
          <div className="pdf-waste-item" />
        </div>
      </div>

      {/* ===== PRE-TREATMENT DECLARATION ===== */}
      <div className="pdf-section-header">
        Pre-treatment declaration (Environmental Permitting (England &amp; Wales) Regulations 2007)
      </div>
      <div className="pdf-section">
        <div className="pdf-row align-center">
          <span className="pdf-label-static">Do you currently segregate your waste?</span>
          <label className="pdf-checkbox-label">
            <input type="radio" name="segregateWaste" value="yes"
              checked={formData.segregateWaste === 'yes'}
              onChange={(e) => updateField('segregateWaste', e.target.value)}
            />
            <span>Yes (If yes, complete next section)</span>
          </label>
          <label className="pdf-checkbox-label">
            <input type="radio" name="segregateWaste" value="no"
              checked={formData.segregateWaste === 'no'}
              onChange={(e) => updateField('segregateWaste', e.target.value)}
            />
            <span>No</span>
          </label>
        </div>

        <p className="pdf-sub-label">
          Which items of waste generated on site are currently recovered or recycled?
        </p>

        {/* Recovered items - row 1 */}
        <div className="pdf-recovered-row">
          {recoveredRow1.map((item) => (
            <label key={item.key} className="pdf-checkbox-label">
              <input type="checkbox" className="pdf-checkbox"
                checked={!!formData.recoveredItems[item.key]}
                onChange={(e) => updateNested('recoveredItems', item.key, e.target.checked)}
              />
              <span>{item.label}</span>
            </label>
          ))}
          <label className="pdf-other-field">
            <input type="checkbox" className="pdf-checkbox"
              checked={!!formData.recoveredOther1Checked}
              onChange={(e) => updateField('recoveredOther1Checked', e.target.checked)}
            />
            <span>Other</span>
            <input type="text"
              value={formData.recoveredOther1}
              onChange={(e) => updateField('recoveredOther1', e.target.value)}
            />
          </label>
        </div>
        {/* Recovered items - row 2 */}
        <div className="pdf-recovered-row">
          {recoveredRow2.map((item) => (
            <label key={item.key} className="pdf-checkbox-label">
              <input type="checkbox" className="pdf-checkbox"
                checked={!!formData.recoveredItems[item.key]}
                onChange={(e) => updateNested('recoveredItems', item.key, e.target.checked)}
              />
              <span>{item.label}</span>
            </label>
          ))}
          <label className="pdf-other-field">
            <input type="checkbox" className="pdf-checkbox"
              checked={!!formData.recoveredOther2Checked}
              onChange={(e) => updateField('recoveredOther2Checked', e.target.checked)}
            />
            <span>Other</span>
            <input type="text"
              value={formData.recoveredOther2}
              onChange={(e) => updateField('recoveredOther2', e.target.value)}
            />
          </label>
        </div>

        <p className="pdf-note" style={{ marginTop: '12px' }}>
          I confirm that I have fulfilled my duty to apply The Waste Hierarchy as required by
          regulation 12 of the England, Wales regulations 2011.
        </p>
      </div>

      {/* ===== HEALTH & SAFETY ===== */}
      <div className="pdf-section-header">Health &amp; Safety</div>
      <div className="pdf-section">
        <table className="pdf-hs-table">
          <thead>
            <tr>
              <th></th>
              <th>Yes</th>
              <th>No</th>
            </tr>
          </thead>
          <tbody>
            {hsQuestions.map((q) => (
              <tr key={q.key}>
                <td className="hs-label">{q.label}</td>
                <td className="hs-check">
                  <input type="radio" name={`hs-${q.key}`}
                    checked={formData.healthSafety[q.key] === 'yes'}
                    onChange={() => updateNested('healthSafety', q.key, 'yes')}
                  />
                </td>
                <td className="hs-check">
                  <input type="radio" name={`hs-${q.key}`}
                    checked={formData.healthSafety[q.key] === 'no'}
                    onChange={() => updateNested('healthSafety', q.key, 'no')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== AUTHORISATION ===== */}
      <div className="pdf-section-header">Authorisation</div>
      <div className="pdf-section">
        <p className="pdf-note" style={{ marginBottom: '16px', padding: 0, fontStyle: 'normal' }}>
          Unless otherwise agreed above, the initial service period will be for 52 weeks.
          HPK Recycling Limited standard terms and conditions apply. Terms and conditions printed on reverse.
        </p>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Signature (supplier)</span>
            <input type="text"
              value={formData.supplierPrintName ? '—' : ''}
              disabled
              style={{ borderBottom: '1px solid #999' }}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Signature (customer)</span>
            <input type="text"
              value={formData.customerPrintName ? '—' : ''}
              disabled
              style={{ borderBottom: '1px solid #999' }}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Print Name</span>
            <input type="text"
              value={formData.supplierPrintName}
              onChange={(e) => updateField('supplierPrintName', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Print Name</span>
            <input type="text"
              value={formData.customerPrintName}
              onChange={(e) => updateField('customerPrintName', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Position</span>
            <input type="text"
              value={formData.supplierPosition}
              onChange={(e) => updateField('supplierPosition', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Position</span>
            <input type="text"
              value={formData.customerPosition}
              onChange={(e) => updateField('customerPosition', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Date</span>
            <input type="date"
              value={formData.supplierDate}
              onChange={(e) => updateField('supplierDate', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Date</span>
            <input type="date"
              value={formData.customerDate}
              onChange={(e) => updateField('customerDate', e.target.value)}
            />
          </label>
        </div>
      </div>
    </>
  );
}
