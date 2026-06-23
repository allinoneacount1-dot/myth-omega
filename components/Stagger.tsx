'use client';

import { useState, useEffect, type ReactNode } from 'react';

export function StaggerContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
