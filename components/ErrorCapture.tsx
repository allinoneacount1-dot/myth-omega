'use client';

import { useState, useEffect } from 'react';

export function ErrorCapture() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      setError(e.message + ' at ' + e.filename + ':' + e.lineno);
    };
    const handler2 = (e: PromiseRejectionEvent) => {
      setError('Promise: ' + String(e.reason));
    };
    window.addEventListener('error', handler);
    window.addEventListener('unhandledrejection', handler2);
    return () => {
      window.removeEventListener('error', handler);
      window.removeEventListener('unhandledrejection', handler2);
    };
  }, []);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[999] mx-auto max-w-2xl rounded border border-ember/50 bg-void-deep/95 p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <span className="text-2xl text-ember">⚠</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-ember">Client Error</p>
          <p className="mt-1 font-mono text-xs text-ivory/70 break-all">{error}</p>
        </div>
        <button
          onClick={() => setError(null)}
          className="text-xs text-ivory/50 hover:text-ivory"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
