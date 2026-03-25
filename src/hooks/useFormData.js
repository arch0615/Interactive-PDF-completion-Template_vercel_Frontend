import { useState, useCallback } from 'react';
import { generatePdf, getDownloadUrl, previewPdf } from '../utils/api';

const initialState = {
  // --- Accounts ---
  companyName: '',
  tradingAs: '',
  regNumber: '',
  proprietorPartnerName: '',
  invoiceAddress1: '',
  invoiceAddress2: '',
  invoiceAddress3: '',
  invoicePostcode: '',
  businessType: {
    limitedCompany: false,
    limitedLiabilityPartnership: false,
    soleTrader: false,
    partnership: false,
  },
  invoiceContact: '',
  invoiceTel: '',
  invoiceEmail: '',
  invoiceMobile: '',
  proprietorHomeAddress1: '',
  proprietorHomeAddress2: '',
  proprietorHomePostcode: '',

  // --- Service ---
  collectionSiteAddress1: '',
  collectionSiteAddress2: '',
  collectionSitePostcode: '',
  serviceContactName: '',
  serviceTel: '',
  serviceEmail: '',
  serviceMobile: '',

  // --- Service Schedule ---
  orderNumber: '',
  serviceRows: Array.from({ length: 5 }, () => ({
    type: '',
    size: '',
    qty: '',
    wasteType: '',
    collectionFreq: '',
    delDate: '',
    emptyCharge: '',
    rentalPerBin: '',
    dutyCare: '',
    delColFee: '',
  })),
  electronicInvoicing: false,
  electronicInvoicingEmail: '',
  initialServiceTermWeeks: '',
  paymentMethod: {
    directDebit: false,
    standardCredit: false,
    inAdvance: false,
  },
  inAdvanceWeeks: '',

  // --- Special Conditions ---
  specialConditions1: '',
  specialConditions2: '',
  specialConditions3: '',
  specialConditions4: '',
  specialConditions5: '',

  // --- Waste Schedule ---
  producer: '',
  wasteProcess: '',
  transferNoteFrom: '',
  transferNoteTo: '',
  wasteTypes: {
    paperCardboard: false,
    glass: false,
    plastics: false,
    metals: false,
    wood: false,
    cateringWaste: false,
    mixedMunicipalWaste: false,
  },

  // --- Pre-treatment Declaration ---
  segregateWaste: '', // 'yes' | 'no'
  recoveredItems: {
    paper: false,
    glass: false,
    plastic: false,
    metals: false,
    wood: false,
    food: false,
    greenwaste: false,
    weee: false,
  },
  recoveredOther1Checked: false,
  recoveredOther1: '',
  recoveredOther2Checked: false,
  recoveredOther2: '',

  // --- Health & Safety ---
  healthSafety: {
    clearAccess: '',
    wellLit: '',
    reverseInOut: '',
    overheadCablesNarrowGateways: '',
    gravelCobbles: '',
    vehicleInView: '',
    excessWalking: '',
    publicStaffAnimals: '',
  },

  // --- Authorisation ---
  supplierSignature: null,
  customerSignature: null,
  supplierPrintName: '',
  customerPrintName: '',
  supplierPosition: '',
  customerPosition: '',
  supplierDate: '',
  customerDate: '',
};

export function useFormData() {
  const [formData, setFormData] = useState(initialState);
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
      // Revoke previous preview blob URL to avoid memory leaks
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const blobUrl = await previewPdf(formData);
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
      const res = await generatePdf(formData);
      if (res.data.success) {
        const url = getDownloadUrl(res.data.filename);
        setDownloadUrl(url);

        // Auto-trigger download
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
    setFormData(initialState);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setError(null);
  }, [previewUrl]);

  return {
    formData,
    isSubmitting,
    isPreviewing,
    previewUrl,
    downloadUrl,
    error,
    updateField,
    updateNested,
    updateServiceRow,
    previewForm,
    submitForm,
    resetForm,
  };
}
