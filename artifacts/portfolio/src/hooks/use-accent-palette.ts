import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'accent-palette';

const PALETTES = [
  {
    light: { accent: '24 67% 53%',  accentBorder: '24 67% 43%',  ring: '24 67% 53%'  },
    dark:  { accent: '24 67% 53%',  accentBorder: '24 67% 43%',  ring: '24 67% 53%'  },
    lightColor: 'hsl(24 67% 53%)',
    darkColor:  'hsl(24 67% 53%)',
  },
  {
    light: { accent: '340 45% 58%', accentBorder: '340 45% 48%', ring: '340 45% 58%' },
    dark:  { accent: '340 55% 65%', accentBorder: '340 55% 55%', ring: '340 55% 65%' },
    lightColor: 'hsl(340 45% 58%)',
    darkColor:  'hsl(340 55% 65%)',
  },
  {
    light: { accent: '152 32% 46%', accentBorder: '152 32% 36%', ring: '152 32% 46%' },
    dark:  { accent: '152 45% 55%', accentBorder: '152 45% 45%', ring: '152 45% 55%' },
    lightColor: 'hsl(152 32% 46%)',
    darkColor:  'hsl(152 45% 55%)',
  },
  {
    light: { accent: '265 40% 58%', accentBorder: '265 40% 48%', ring: '265 40% 58%' },
    dark:  { accent: '265 55% 65%', accentBorder: '265 55% 55%', ring: '265 55% 65%' },
    lightColor: 'hsl(265 40% 58%)',
    darkColor:  'hsl(265 55% 65%)',
  },
];

function applyPalette(idx: number) {
  const el = document.documentElement;
  if (el.classList.contains('blueprint')) return;
  const isDark = el.classList.contains('dark');
  const vars = isDark ? PALETTES[idx].dark : PALETTES[idx].light;
  el.style.setProperty('--accent', vars.accent);
  el.style.setProperty('--accent-foreground', '38 31% 95%');
  el.style.setProperty('--accent-border', vars.accentBorder);
  el.style.setProperty('--ring', vars.ring);
}

function removePaletteVars() {
  const el = document.documentElement;
  el.style.removeProperty('--accent');
  el.style.removeProperty('--accent-foreground');
  el.style.removeProperty('--accent-border');
  el.style.removeProperty('--ring');
}

export function useAccentPalette() {
  const [idx, setIdx] = useState<number>(() => {
    try {
      const raw = Number(localStorage.getItem(STORAGE_KEY));
      return Number.isInteger(raw) && raw >= 0 && raw < PALETTES.length ? raw : 2;
    } catch {
      return 2;
    }
  });

  const idxRef = useRef(idx);
  idxRef.current = idx;

  useEffect(() => {
    applyPalette(idx);
  }, [idx]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('blueprint')) {
        removePaletteVars();
      } else {
        applyPalette(idxRef.current);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const cycleAccent = useCallback((): string => {
    const next = (idxRef.current + 1) % PALETTES.length;
    idxRef.current = next;
    setIdx(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch {}
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? PALETTES[next].darkColor : PALETTES[next].lightColor;
  }, []);

  return { cycleAccent };
}
