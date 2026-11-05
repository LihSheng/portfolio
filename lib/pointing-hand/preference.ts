'use client';

import { useSyncExternalStore } from 'react';

/** The visitor's choice to show or hide the pointing hand, kept in localStorage. */
const STORAGE_KEY = 'pointing-hand';
const CHANGE_EVENT = 'pointing-hand-change';

function read(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function setPointingHandEnabled(enabled: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  } catch {
    // Storage can be blocked (private mode); the change still applies for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function usePointingHandEnabled(): boolean {
  return useSyncExternalStore(subscribe, read, () => true);
}
