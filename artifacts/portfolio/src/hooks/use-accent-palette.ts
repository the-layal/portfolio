import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'accent-palette';

const PALETTES = [
  {
    light: { accent: '24 67% 53%',  accentBorder: '24 67% 43%',  ring: '24 67% 53%'  },
    dark:  { accent: '24 67% 53%',  accentBorder: '24 67% 43%',  ring: '24 67% 53%'  },
    color: 'hsl(24 67% 53%)',
  },
  {
    light: { accent: '340 45% 58%', accentBorder: '340 45% 48%', ring: '340 45% 58%' },
    dark:  { accent: '340 55% 65%', accentBorder: '340 55% 55%', ring: '340 55% 65%' },
    color: 'hsl(340 45% 58%)',
  },
  {
    light: { accent: '152 32% 46%', accentBorder: '152 32% 36%', ring: '152 32% 46%' },
    dark:  { accent: '152 45% 55%', accentBorder: '152 45% 45%', ring: '152 45% 55%' },
    color: 'hsl(152 32% 46%)',
  },
  {
    light: { accent: '265 40% 58%', accentBorder: '265 40% 48%', ring: '265 40% 58%' },
    dark:  { accent: '265 55% 65%', accentBorder: '265 55% 55%', ring: '265 55% 65%' },
    color: 'hsl(265 40% 58%)',
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
    try { return Math.min(Number(localStorage.getItem(STORAGE_KEY) ?? '0'), PALETTES.length - 1); }
    catch { return 0; }
  });

  useEffect(() => {
    applyPalette(idx);
  }, [idx]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains('blueprint')) {
        removePaletteVars();
      } else {
        applyPalette(idx);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [idx]);

  const cycleAccent = useCallback(() => {
    const next = (idx + 1) % PALETTES.length;
    setIdx(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch {}
    return PALETTES[next].color;
  }, [idx]);

  return { cycleAccent, accentColor: PALETTES[idx].color };
}
