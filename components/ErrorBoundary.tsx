'use client';

import { useState, useEffect, Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-void p-8">
          <div className="max-w-lg text-center">
            <div className="mb-6 font-mono text-6xl text-gold">⚠</div>
            <h2 className="font-display text-2xl text-ivory">Something went wrong</h2>
            <pre className="mt-6 max-h-64 overflow-auto rounded bg-void-deep p-6 text-left text-sm text-ember" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="label mt-8 border border-gold px-8 py-4 text-gold transition-all hover:bg-gold hover:text-void"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
