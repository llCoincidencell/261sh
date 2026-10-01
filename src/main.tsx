alert("BİLGİ: main.tsx dosyası başarıyla yüklendi ve çalışıyor!");

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// React Sessiz Çökme Yakalayıcı (Error Boundary)
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#7f1d1d', backgroundColor: '#fef2f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>⚠️ Sistem Çöktü!</h2>
          <p style={{ fontSize: '14px' }}>Uygulama kodları çalışırken bir hata oluştu:</p>
          <pre style={{ fontSize: '11px', marginTop: '10px', whiteSpace: 'pre-wrap', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px' }}>
            {this.state.error?.message || 'Bilinmeyen React Hatası'}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
