# Easter Eggs

Hidden features for curious visitors. All of them are passive: they render
nothing visible, block no clicks, and stay out of the way until someone
deliberately triggers one.

## Master switch

`NEXT_PUBLIC_FEATURE_EASTER_EGGS` (default on). Set it to `false` to remove
every egg, including the `/terminal` route, which then returns 404.

## The eggs

| # | Egg | Trigger | Where it lives |
|---|-----|---------|----------------|
| 1 | Konami code | ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the site | `lib/easter-eggs/useSecretKeys.ts`, confetti in `components/easter-eggs/confetti.ts` |
| 2 | Console greeting | Open DevTools | `components/easter-eggs/EasterEggs.tsx` |
| 3 | Portrait clicks | Click the About page portrait 7 times within 3 seconds | `components/easter-eggs/AvatarEgg.tsx`. Set `NEXT_PUBLIC_PROFILE_PICTURE_ALT_URL` to flip to a second photo; without it the portrait wobbles with a message |
| 4 | Terminal theme | Toggle light/dark 10 times within 5 seconds; one more click leaves it | `components/ThemeToggle.tsx`, styles under `.theme-terminal` in `app/globals.css` |
| 5 | Hidden terminal | Visit `/terminal` (not in navigation or sitemap, `noindex`) | `app/terminal/page.tsx`, `components/easter-eggs/Terminal.tsx` |
| 6 | The void | Any 404 page: click the drifting stars, collect 10 | `components/easter-eggs/VoidField.tsx`, mounted in `app/not-found.tsx` |
| 7 | Secret words | Type `hello` or `lihsheng` outside any input | `lib/easter-eggs/useSecretKeys.ts` |
| 8 | Footer hint | Hover the faint egg next to the copyright | `components/Footer.tsx` |

## Guarantees for normal browsing

- The keyboard listener is passive, never calls `preventDefault`, ignores
  Ctrl/Meta/Alt chords, and ignores keystrokes inside inputs, textareas,
  selects and contenteditable elements.
- Every animation respects `prefers-reduced-motion` (CSS keyframes are
  disabled there, and confetti checks the same media query). With reduced
  motion on, eggs still fire but only show the text toast.
- The toast container is `pointer-events: none` and empty until an egg fires.
- The 404 star field sits behind the content and only receives clicks on
  empty paper; the page links stay fully usable.
- The egg host is rendered statically with the layout rather than mounted
  later from a state update, so it can never race a navigation click.
- Eggs are announced through a `CustomEvent` (`lib/easter-eggs/events.ts`),
  so components stay decoupled and nothing here touches server rendering.

## Tests

`tests/e2e/easter-eggs.spec.ts` covers each egg and checks that typing in
the contact form never triggers one and that normal pages log no new
console errors.
