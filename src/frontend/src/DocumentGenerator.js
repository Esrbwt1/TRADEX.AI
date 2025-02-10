import React, { useState } from 'react';

const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState('');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          document_type: documentType,
          details: details
        })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.document);
      } else {
        setError(data.error || 'Unknown error occurred.');
      }
    } catch (err) {
      setError(err.toString());
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Trade Document Generator</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Document Type:</label>
          <input
            type="text"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            placeholder="e.g., invoice, bill of lading"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter trade details..."
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          {loading ? 'Generating...' : 'Generate Document'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Document:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;