import React, { useState } from 'react';

const ComplianceChecker = () => {
  const [documentText, setDocumentText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckCompliance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/check-compliance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          document: documentText
        })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data);
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
      <h2>Compliance Checker</h2>
      <form onSubmit={handleCheckCompliance}>
        <div style={{ marginBottom: '10px' }}>
          <label>Enter Trade Document:</label>
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste your trade document here..."
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          {loading ? 'Checking...' : 'Check Compliance'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Compliance Result:</h3>
          <p>Status: {result.compliance_status}</p>
          <p>Details: {result.details}</p>
        </div>
      )}
    </div>
  );
};

export default ComplianceChecker;