import { useState, useCallback } from 'react';
import { generatePdf, getDownloadUrl, previewPdf } from '../utils/api';

export const initialStateT3 = {
  // --- Header ---
  quoteDate: '13.06.22',
  quoteRef: '206475',
  customerName: 'Ben Roberts',
  validDays: '30',

  // --- Service Table ---
  serviceRows: [
    { container: '', containerSize: '', quantity: '', lifts: '', wasteStream: '' },
    { container: '', containerSize: '', quantity: '', lifts: '', wasteStream: '' },
    { container: '', containerSize: '', quantity: '', lifts: '', wasteStream: '' },
    { container: '', containerSize: '', quantity: '', lifts: '', wasteStream: '' },
  ],

  // --- Contract Terms ---
  contractTerms: 'Our standard contract has an initial 12 month term, plus a notice period. Extended terms are available if required',

  // --- Pricing ---
  pricingNotes: '',
  weeklyCharge: '18.05',
  monthlyCharge: '78.22',
  annualCharge: '936.60',
  vatRate: '20.00',

  // --- Contact ---
  freephone: '',
  email: '',
};

export function useFormDataTemplate3() {
  const [formData, setFormData] = useState(initialStateT3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateServiceRow = useCallback((index, field, value) => {
    setFormData((prev) => {
      const newRows = [...prev.serviceRows];
      newRows[index] = { ...newRows[index], [field]: value };
      return { ...prev, serviceRows: newRows };
    });
  }, []);

  const previewForm = useCallback(async () => {
    setIsPreviewing(true);
    setError(null);
    try {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const blobUrl = await previewPdf({ ...formData, _templateId: 'biffa-quotation' });
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
      const res = await generatePdf({ ...formData, _templateId: 'biffa-quotation' });
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
    setFormData(initialStateT3);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setError(null);
  }, [previewUrl]);

  return {
    formData, isSubmitting, isPreviewing, previewUrl, downloadUrl, error,
    updateField, updateServiceRow,
    previewForm, submitForm, resetForm,
  };
}
