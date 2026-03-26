import { useState, useCallback } from 'react';
import { generatePdf, getDownloadUrl, previewPdf } from '../utils/api';

export const initialStateT2 = {
  // --- Header ---
  ticketName: '',
  ticketLocation: '',
  ticketDate: '',

  // --- Section A: Description of Waste ---
  wasteRows: [
    { description: 'General Waste', ewcCodes: '20 03 01', containment: 'Sack', quantity: 'Varies' },
    { description: 'Mixed Recycling', ewcCodes: '20 01 01, 20 01 02, 20 01 39, 20 01 40', containment: 'Sack', quantity: 'Varies' },
  ],

  // --- Section B: Current Holder - Transferor ---
  wasteHierarchyConfirm: true,
  b1CompanyName: 'Zia Lucia (Holloway Road)',
  b1CompanyAddress: '157 Holloway Road',
  b1PostCode: 'N7 8LX',
  b1SicCode: '64191',
  b2UnitaryOrCouncil: 'Islington',
  b3IsProducer: 'Yes',
  b3IsRegisteredCarrier: 'No',
  b3CarrierRegNumber: '',

  // --- Section C: Person Collecting - Transferee ---
  c1CompanyName: 'First Mile Ltd',
  c1CompanyAddress: '233 High Holborn, London',
  c1PostCode: 'WC1V 7DN',
  c2IsLocalAuthority: 'False',
  c3HasEnvironmentalPermit: 'No',
  c3HasWasteExemption: 'No',
  c3IsRegisteredCarrier: 'Yes',
  c3RegistrationNumber: 'CBDU80647',

  // --- Section D: The Transfer ---
  d1CompanyName: '',
  d1CompanyAddress: '',
  d1PostCode: '',
  d1DateFrom: '',
  d1DateTo: '',
  d2CompanyName: '',
  d2CompanyAddress: '',
  d2PostCode: '',
  d2RegNumber: '',

  // --- Section E: Signatures ---
  transferorSignature: null,
  transferorName: '',
  transferorRepresenting: '',
  transfereeSignature: null,
  transfereeName: '',
  transfereeRepresenting: '',
};

export function useFormDataTemplate2() {
  const [formData, setFormData] = useState(initialStateT2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateNested = useCallback((group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: { ...prev[group], [field]: value },
    }));
  }, []);

  const updateWasteRow = useCallback((index, field, value) => {
    setFormData((prev) => {
      const newRows = [...prev.wasteRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return { ...prev, wasteRows: newRows };
    });
  }, []);

  const previewForm = useCallback(async () => {
    setIsPreviewing(true);
    setError(null);
    try {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const blobUrl = await previewPdf({ ...formData, _templateId: 'first-mile-wtn' });
      setPreviewUrl(blobUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate preview');
    } finally {
      setIsPreviewing(false);
    }
  }, [formData, previewUrl]);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const res = await generatePdf({ ...formData, _templateId: 'first-mile-wtn' });
      if (res.data.success) {
        const url = getDownloadUrl(res.data.filename);
        setDownloadUrl(url);
        const link = document.createElement('a');
        link.href = url;
        link.download = res.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate PDF');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setFormData(initialStateT2);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setError(null);
  }, [previewUrl]);

  return {
    formData, isSubmitting, isPreviewing, previewUrl, downloadUrl, error,
    updateField, updateNested, updateWasteRow,
    previewForm, submitForm, resetForm,
  };
}
