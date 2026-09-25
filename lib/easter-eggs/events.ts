/**
 * Tiny event bus for easter eggs.
 *
 * Eggs are deliberately decoupled: the keyboard listener only announces that
 * something was found, and interested components (hero avatar, toast, ...)
 * react to it. Nothing here runs on the server.
 */

export type EasterEggId =
  | 'konami'
  | 'secret-word'
  | 'avatar'
  | 'secret-theme'
  | 'void';

export interface EasterEggDetail {
  id: EasterEggId;
  message?: string;
}

export const EASTER_EGG_EVENT = 'lihsheng:easter-egg';

export function announceEasterEgg(detail: EasterEggDetail): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<EasterEggDetail>(EASTER_EGG_EVENT, { detail }));
}

export function onEasterEgg(handler: (detail: EasterEggDetail) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (event: Event) => {
    handler((event as CustomEvent<EasterEggDetail>).detail);
  };
  window.addEventListener(EASTER_EGG_EVENT, listener);
  return () => window.removeEventListener(EASTER_EGG_EVENT, listener);
}

/**
 * True when a keyboard event originates from something the visitor is typing
 * into. The secret key listener must never swallow those keystrokes.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}
