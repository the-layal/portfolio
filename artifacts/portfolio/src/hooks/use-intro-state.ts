import { useSyncExternalStore } from 'react';

let introVisible = false;
const listeners = new Set<() => void>();

export function setIntroVisible(visible: boolean) {
  if (introVisible === visible) return;
  introVisible = visible;
  listeners.forEach(l => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return introVisible;
}

function getServerSnapshot() {
  return false;
}

export function useIntroVisible(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
