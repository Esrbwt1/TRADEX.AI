import React from 'react';
import './App.css';
import DocumentGenerator from './DocumentGenerator';
import ComplianceChecker from './ComplianceChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to TRADEX.AI</h1>
      </header>
      <main>
        <DocumentGenerator />
        <hr style={{ margin: '40px 0' }} />
        <ComplianceChecker />
      </main>
    </div>
  );
}

export default App;