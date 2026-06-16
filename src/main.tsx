import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite HMR websocket connection errors and unhandled rejections in sandboxed preview
if (typeof window !== 'undefined') {
  const isViteWsError = (msg: unknown) => {
    if (typeof msg !== 'string') return false;
    const lower = msg.toLowerCase();
    return lower.includes('websocket') || lower.includes('failed to connect') || lower.includes('closed without opened');
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || event.reason;
    if (isViteWsError(reason)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (isViteWsError(msg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

