'use client';

import { useEffect } from 'react';
import { announceEasterEgg, isTypingTarget } from './events';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/** Words a visitor can type anywhere on the page (outside inputs). */
const SECRET_WORDS: Record<string, string> = {
  hello: 'Hello to you too. Thanks for stopping by.',
  lihsheng: 'You typed my name. I am flattered, and slightly concerned.',
};

const MAX_WORD_LENGTH = Math.max(...Object.keys(SECRET_WORDS).map((w) => w.length));

/**
 * One passive keydown listener for every keyboard-triggered egg.
 *
 * - Never calls preventDefault, so browser shortcuts keep working.
 * - Ignores keystrokes inside inputs, textareas, selects and contenteditable.
 * - Ignores chords with Ctrl / Meta / Alt held.
 */
export function useSecretKeys(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    let konamiIndex = 0;
    let typed = '';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      // Konami code
      if (key === KONAMI[konamiIndex]) {
        konamiIndex += 1;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          announceEasterEgg({ id: 'konami', message: 'Achievement unlocked: 30 extra lives.' });
        }
      } else {
        konamiIndex = key === KONAMI[0] ? 1 : 0;
      }

      // Typed secret words
      if (/^[a-z]$/.test(key)) {
        typed = (typed + key).slice(-MAX_WORD_LENGTH);
        for (const word of Object.keys(SECRET_WORDS)) {
          if (typed.endsWith(word)) {
            typed = '';
            announceEasterEgg({ id: 'secret-word', message: SECRET_WORDS[word] });
            break;
          }
        }
      } else if (key !== 'Shift') {
        typed = '';
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
