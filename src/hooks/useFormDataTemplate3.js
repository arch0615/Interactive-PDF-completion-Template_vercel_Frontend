import { useState, useCallback } from 'react';
import { generatePdf, getDownloadUrl, previewPdf } from '../utils/api';

export const initialStateT3 = {
  // --- Header ---
  quoteDate: '13.06.22',
  quoteRef: '206475',
  customerName: 'Ben Roberts',
  validDays: '30',

  // --- Address & Contract ---
  wasteCollectionAddress: 'Carlton., 28 DUNKIRK ROAD, SOUTHPORT, PR8 4RQ',
  contractTerm: 'Our standard contract has an initial 12 month term, plus a notice period. Extended terms are available if required.',

  // --- Service Table ---
  serviceRows: [
    { item: '1', wasteType: 'General Waste', containerSizeType: '240L CONTAINER', qty: '1', collectionFreq: 'Weekly', weightLimit: '20kg', liftRate: '£9.76', priceTonne: '', dailyRental: '£0.00', wtnCharge: '£1.55', totalWeekly: '£11.31' },
    { item: '2', wasteType: 'Mixed Recycling', containerSizeType: '240L CONTAINER', qty: '1', collectionFreq: 'Weekly', weightLimit: '6kg', liftRate: '£5.19', priceTonne: '', dailyRental: '£0.00', wtnCharge: '£1.55', totalWeekly: '£6.74' },
    { item: '', wasteType: '', containerSizeType: '', qty: '', collectionFreq: '', weightLimit: '', liftRate: '', priceTonne: '', dailyRental: '', wtnCharge: '', totalWeekly: '' },
    { item: '', wasteType: '', containerSizeType: '', qty: '', collectionFreq: '', weightLimit: '', liftRate: '', priceTonne: '', dailyRental: '', wtnCharge: '', totalWeekly: '' },
    { item: '', wasteType: '', containerSizeType: '', qty: '', collectionFreq: '', weightLimit: '', liftRate: '', priceTonne: '', dailyRental: '', wtnCharge: '', totalWeekly: '' },
    { item: '', wasteType: '', containerSizeType: '', qty: '', collectionFreq: '', weightLimit: '', liftRate: '', priceTonne: '', dailyRental: '', wtnCharge: '', totalWeekly: '' },
  ],

  // --- Pricing ---
  pricingNotes: '* Assumed Weight Limit - The maximum weight of waste you can supply (per lift, per container). Varies for Exchange services\n† Lift Rate / Haulage - Price per container, per visit, to collect your waste. If no price per tonne is stated, disposal of your waste is included\nPlastic Bags – Cost of collection is payable in advance, in multiples of 50 bags\n‡ WTN Standard Charge - The cost to complete your Waste Transfer Note documentation. In some instances only one WTN charge will apply\nOne-off container delivery charge is applicable to all new contracts except Plastic Bags (from £25 per container) and will appear on your first invoice',
  weeklyCharge: '18.05',
  monthlyCharge: '78.22',
  annualCharge: '938.60',

  // --- Contact ---
  freephone: '0800 1123443',
  freephoneHours: 'Mon - Fri, 8.30am - 5.00pm,\nexcluding public holidays',
  email: 'admin@nationwidewasteandrecycling.co.uk',
  emailNote: 'Write to us confirming\nacceptance of this quote',
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
