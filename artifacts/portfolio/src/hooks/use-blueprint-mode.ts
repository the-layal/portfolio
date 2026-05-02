import { useState, useEffect, useRef, useCallback } from 'react';

const AUTO_EXIT_MS = 6000;
const BP_CLASS = 'blueprint';

export function useBlueprintMode() {
  const [isBlueprint, setIsBlueprint] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exit = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsBlueprint(false);
    document.documentElement.classList.remove(BP_CLASS);
  }, []);

  const enter = useCallback(() => {
    setIsBlueprint(true);
    document.documentElement.classList.add(BP_CLASS);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(exit, AUTO_EXIT_MS);
  }, [exit]);

  const toggle = useCallback(() => {
    if (isBlueprint) {
      exit();
    } else {
      enter();
    }
  }, [isBlueprint, enter, exit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === 'b' || e.key === 'B') toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timerRef.current) clearTimeout(timerRef.current);
      document.documentElement.classList.remove(BP_CLASS);
    };
  }, [toggle]);

  return { isBlueprint };
}
