export default function Template2Page1({ formData, updateField, updateWasteRow }) {
  return (
    <>
      {/* ===== SECTION A ===== */}
      <div className="t2-section">
        <table className="t2-table">
          <thead>
            <tr>
              <th colSpan={4} className="t2-table-section-header">Section A - Description of Waste</th>
            </tr>
            <tr>
              <th style={{ width: '22%' }}>A1. Description of Waste Being Transferred</th>
              <th style={{ width: '40%' }}>EWC Codes</th>
              <th style={{ width: '20%' }}>A2. How is the waste contained?</th>
              <th style={{ width: '18%' }}>A3. How Much Waste?</th>
            </tr>
          </thead>
          <tbody>
            {formData.wasteRows.map((row, i) => (
              <tr key={i}>
                <td>
                  <input type="text" value={row.description}
                    onChange={(e) => updateWasteRow(i, 'description', e.target.value)} />
                </td>
                <td>
                  <input type="text" value={row.ewcCodes}
                    onChange={(e) => updateWasteRow(i, 'ewcCodes', e.target.value)} />
                </td>
                <td>
                  <input type="text" value={row.containment}
                    onChange={(e) => updateWasteRow(i, 'containment', e.target.value)} />
                </td>
                <td>
                  <input type="text" value={row.quantity}
                    onChange={(e) => updateWasteRow(i, 'quantity', e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== SECTION B ===== */}
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td colSpan={2} className="t2-sub-header-row" style={{ fontWeight: 700 }}>Section B - Current Holder of the Waste - Transferor</td>
            </tr>
          </tbody>
        </table>

        <div className="t2-declaration">
          <span>By signing in Section E below, I confirm that I have fulfilled my duty to apply the waste hierarchy as required by Regulation 12 of the Waste (England and Wales) Regulations 2011</span>
          <label className="t2-cb-inline">
            <input type="checkbox" className="pdf-checkbox"
              checked={!!formData.wasteHierarchyConfirm}
              onChange={(e) => updateField('wasteHierarchyConfirm', e.target.checked)} />
            <span>Yes</span>
          </label>
        </div>

        <table className="t2-field-table">
          <tbody>
            <tr>
              <td className="t2-sub-header-row">B1. Full Name</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b1CompanyName}
                  onChange={(e) => updateField('b1CompanyName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Address</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b1CompanyAddress}
                  onChange={(e) => updateField('b1CompanyAddress', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">PostCode</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b1PostCode}
                  onChange={(e) => updateField('b1PostCode', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">SIC Code</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b1SicCode}
                  onChange={(e) => updateField('b1SicCode', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell" style={{ fontWeight: 600 }}>B2. Name of your Unitary or council</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b2UnitaryOrCouncil}
                  onChange={(e) => updateField('b2UnitaryOrCouncil', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-sub-header-row">B3. Are you:</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">The Producer of the waste?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b3IsProducer}
                  onChange={(e) => updateField('b3IsProducer', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">A registered waste carrier, broker or dealer?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b3IsRegisteredCarrier}
                  onChange={(e) => updateField('b3IsRegisteredCarrier', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Registration no. if waste carrier, broker or dealer</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.b3CarrierRegNumber}
                  onChange={(e) => updateField('b3CarrierRegNumber', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== SECTION C ===== */}
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td colSpan={2} className="t2-sub-header-row" style={{ fontWeight: 700 }}>Section C - Person Collecting the Waste - Transferee</td>
            </tr>
            <tr>
              <td className="t2-sub-header-row">C1.</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c1CompanyName}
                  onChange={(e) => updateField('c1CompanyName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Address</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c1CompanyAddress}
                  onChange={(e) => updateField('c1CompanyAddress', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">PostCode</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c1PostCode}
                  onChange={(e) => updateField('c1PostCode', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell" style={{ fontWeight: 600 }}>C2. Are you the local authority?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c2IsLocalAuthority}
                  onChange={(e) => updateField('c2IsLocalAuthority', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-sub-header-row">C3. Are you:</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">The holder of an environmental permit?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c3HasEnvironmentalPermit}
                  onChange={(e) => updateField('c3HasEnvironmentalPermit', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Registered Waste exemption?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c3HasWasteExemption}
                  onChange={(e) => updateField('c3HasWasteExemption', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">A registered waste carrier, broker or dealer?</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c3IsRegisteredCarrier}
                  onChange={(e) => updateField('c3IsRegisteredCarrier', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Registration number:</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.c3RegistrationNumber}
                  onChange={(e) => updateField('c3RegistrationNumber', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
