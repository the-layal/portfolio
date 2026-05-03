import React, { createContext, useContext, useState, useCallback } from 'react';

interface LightboxState {
  src: string;
  alt: string;
}

interface LightboxContextValue {
  state: LightboxState | null;
  open: (src: string, alt?: string) => void;
  close: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const open = useCallback((src: string, alt = '') => setState({ src, alt }), []);
  const close = useCallback(() => setState(null), []);
  return (
    <LightboxContext.Provider value={{ state, open, close }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
