import { useState, useEffect, useRef, useCallback } from 'react';

const AUTO_EXIT_MS = 6000;
const BP_CLASS = 'blueprint';

export function useBlueprintMode() {
  const [isBlueprint, setIsBlueprint] = useState(false);
  const isBlueprintRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exit = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    isBlueprintRef.current = false;
    setIsBlueprint(false);
  }, []);

  const enter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    isBlueprintRef.current = true;
    setIsBlueprint(true);
    timerRef.current = setTimeout(exit, AUTO_EXIT_MS);
  }, [exit]);

  // Sync DOM class whenever blueprint state changes
  useEffect(() => {
    if (isBlueprint) {
      document.documentElement.classList.add(BP_CLASS);
    } else {
      document.documentElement.classList.remove(BP_CLASS);
    }
  }, [isBlueprint]);

  // Stable keydown listener — registered once, reads state via ref
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.key !== 'b' && e.key !== 'B') return;

      if (isBlueprintRef.current) {
        exit();
      } else {
        enter();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timerRef.current) clearTimeout(timerRef.current);
      document.documentElement.classList.remove(BP_CLASS);
    };
  }, [enter, exit]);

  return { isBlueprint };
}
