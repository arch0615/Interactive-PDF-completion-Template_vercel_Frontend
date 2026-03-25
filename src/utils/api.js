import axios from 'axios';

const API_BASE = '/api/pdf';

export const getTemplateInfo = () => axios.get(`${API_BASE}/template-info`);

export const generatePdf = (data) => axios.post(`${API_BASE}/generate`, data);

export const getTemplateUrl = () => `${API_BASE}/template`;

export const getDownloadUrl = (filename) => `${API_BASE}/download/${filename}`;

export const previewPdf = async (data) => {
  const res = await axios.post(`${API_BASE}/preview`, data, {
    responseType: 'blob',
  });
  return URL.createObjectURL(res.data);
};
