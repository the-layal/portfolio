import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLightbox } from '@/contexts/LightboxContext';

export default function Lightbox() {
  const { state, close } = useLightbox();

  useEffect(() => {
    if (!state) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, close]);

  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state]);

  return createPortal(
    <AnimatePresence>
      {state && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5vh 5vw',
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: 16,
              right: 20,
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 32,
              lineHeight: 1,
              cursor: 'pointer',
              padding: '4px 8px',
              zIndex: 1,
            }}
          >
            ×
          </button>
          <motion.img
            key={state.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            src={state.src}
            alt={state.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
