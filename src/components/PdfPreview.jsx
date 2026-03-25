import { useState, useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfPreview({ pdfUrl }) {
  const canvasRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl) return;

    let cancelled = false;
    setError(null);

    const loadingTask = getDocument(pdfUrl);
    loadingTask.promise
      .then((doc) => {
        if (!cancelled) {
          setPdfDoc(doc);
          setPageCount(doc.numPages);
          setCurrentPage(1);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('PDF load error:', err);
          setError('Failed to load PDF preview');
        }
      });

    return () => {
      cancelled = true;
      loadingTask.destroy?.();
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    pdfDoc.getPage(currentPage).then((page) => {
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context, viewport });
    });
  }, [pdfDoc, currentPage]);

  if (!pdfUrl) {
    return (
      <div className="pdf-preview-placeholder">
        <p>PDF preview will appear here</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-preview-placeholder">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pdf-preview">
      <canvas ref={canvasRef} className="pdf-canvas" />
      {pageCount > 1 && (
        <div className="pdf-nav">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {pageCount}</span>
          <button
            disabled={currentPage >= pageCount}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
