import { useState, useEffect, useRef, useCallback } from 'react';

const BP_CLASS = 'blueprint';

export function useBlueprintMode() {
  const [isBlueprint, setIsBlueprint] = useState(false);
  const isBlueprintRef = useRef(false);

  const exit = useCallback(() => {
    isBlueprintRef.current = false;
    setIsBlueprint(false);
  }, []);

  const enter = useCallback(() => {
    isBlueprintRef.current = true;
    setIsBlueprint(true);
  }, []);

  useEffect(() => {
    if (isBlueprint) {
      document.documentElement.classList.add(BP_CLASS);
    } else {
      document.documentElement.classList.remove(BP_CLASS);
    }
  }, [isBlueprint]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
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
      document.documentElement.classList.remove(BP_CLASS);
    };
  }, [enter, exit]);

  return { isBlueprint };
}
