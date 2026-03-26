export default function Template2Page2({ formData, updateField }) {
  return (
    <>
      {/* ===== SECTION D ===== */}
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td colSpan={2} className="t2-sub-header-row" style={{ fontWeight: 700 }}>Section D - The Transfer</td>
            </tr>
            <tr>
              <td className="t2-sub-header-row">D1. Address of transfer or collection point</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d1CompanyName}
                  onChange={(e) => updateField('d1CompanyName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Address</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d1CompanyAddress}
                  onChange={(e) => updateField('d1CompanyAddress', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">PostCode</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d1PostCode}
                  onChange={(e) => updateField('d1PostCode', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Date of Transfer</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d1DateFrom}
                  onChange={(e) => updateField('d1DateFrom', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="t2-sub-header-row">D2. Broker or dealer who arranged this transfer (if applicable)</td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d2CompanyName}
                  onChange={(e) => updateField('d2CompanyName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Company Address</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d2CompanyAddress}
                  onChange={(e) => updateField('d2CompanyAddress', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">PostCode</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d2PostCode}
                  onChange={(e) => updateField('d2PostCode', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Registration number:</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.d2RegNumber}
                  onChange={(e) => updateField('d2RegNumber', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== SECTION E ===== */}
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td className="t2-sub-header-row" style={{ fontWeight: 700 }}>Section E - Signatures</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr className="t2-sig-row">
              <td className="t2-label-cell t2-label-indent">Transferor's Signature:</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.transferorName}
                  onChange={(e) => updateField('transferorName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Representing</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.transferorRepresenting}
                  onChange={(e) => updateField('transferorRepresenting', e.target.value)} />
              </td>
            </tr>
            <tr className="t2-sig-row">
              <td className="t2-label-cell t2-label-indent">Transferee's Signature:</td>
              <td className="t2-value-cell"></td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Name</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.transfereeName}
                  onChange={(e) => updateField('transfereeName', e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="t2-label-cell t2-label-indent">Representing</td>
              <td className="t2-value-cell">
                <input type="text" value={formData.transfereeRepresenting}
                  onChange={(e) => updateField('transfereeRepresenting', e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="t2-disclaimer">
        Please keep this document for a minimum of 2 years. First Mile reserves the right to invalidate any time remaining on this
        Waste Transfer Note due to service cancellation, non-payment, or any other breach of our terms.
      </div>
    </>
  );
}
