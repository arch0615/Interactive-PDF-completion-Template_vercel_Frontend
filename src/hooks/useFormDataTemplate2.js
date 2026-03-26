import { useState, useCallback } from 'react';
import { generatePdf, getDownloadUrl, previewPdf } from '../utils/api';

export const initialStateT2 = {
  // --- Header ---
  ticketName: '',
  ticketLocation: '',
  ticketDate: '',

  // --- Section A: Description of Waste ---
  wasteRows: Array.from({ length: 6 }, () => ({
    description: '',
    ewcCodes: '',
    containment: '',
    quantity: '',
  })),

  // --- Section B: Current Holder - Transferor ---
  wasteHierarchyConfirm: false,
  b1CompanyName: '',
  b1CompanyAddress: '',
  b1PostCode: '',
  b1SicCode: '',
  b2UnitaryOrCouncil: '',
  b3IsProducer: '',
  b3IsRegisteredCarrier: '',
  b3CarrierRegNumber: '',

  // --- Section C: Person Collecting - Transferee ---
  c1CompanyName: '',
  c1CompanyAddress: '',
  c1PostCode: '',
  c2IsLocalAuthority: '',
  c3HasEnvironmentalPermit: '',
  c3HasWasteExemption: '',
  c3IsRegisteredCarrier: '',
  c3RegistrationNumber: '',

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
