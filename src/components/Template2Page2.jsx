import { useRef, useEffect } from 'react';

function SignatureField({ label, value, onChange }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (value && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = value;
    }
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1a365d';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    onChange(canvasRef.current.toDataURL());
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onChange(null);
  };

  return (
    <tr>
      <td className="t2-label-cell">{label}</td>
      <td className="t2-value-cell t2-sig-canvas-cell">
        <canvas
          ref={canvasRef}
          className="pdf-signature-canvas"
          width={340}
          height={50}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        <button type="button" className="pdf-sig-clear" onClick={clear}>Clear</button>
      </td>
    </tr>
  );
}

export default function Template2Page2({ formData, updateField }) {
  return (
    <>
      {/* ===== SECTION D ===== */}
      <div className="t2-section-header">Section D - The Transfer</div>
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <tr>
              <td colSpan={2} className="t2-sub-header-row">D1. Address of transfer or collection point</td>
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
              <td className="t2-value-cell t2-date-range">
                <input type="date" value={formData.d1DateFrom}
                  onChange={(e) => updateField('d1DateFrom', e.target.value)} />
                <span className="t2-date-sep">-</span>
                <input type="date" value={formData.d1DateTo}
                  onChange={(e) => updateField('d1DateTo', e.target.value)} />
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
      <div className="t2-section-header">Section E - Signatures</div>
      <div className="t2-section">
        <table className="t2-field-table">
          <tbody>
            <SignatureField
              label="Transferor's Signature:"
              value={formData.transferorSignature}
              onChange={(v) => updateField('transferorSignature', v)}
            />
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
            <SignatureField
              label="Transferee's Signature:"
              value={formData.transfereeSignature}
              onChange={(v) => updateField('transfereeSignature', v)}
            />
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

        <div className="t2-disclaimer">
          Please keep this document for a minimum of 2 years. First Mile reserves the right to invalidate any time remaining on this
          Waste Transfer Note due to service cancellation, non-payment, or any other breach of our terms.
        </div>
      </div>
    </>
  );
}
