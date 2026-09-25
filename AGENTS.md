# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Kiro and similar) when working with code in this repository.

## Commands

```bash
npm run dev            # Start dev server on :3000 (Turbopack)
npm run build           # Production build
npm run start           # Start production server on :3000
npm run lint             # eslint . (flat config in eslint.config.mjs)
npm run type-check      # tsc --noEmit
npm run format           # prettier --write .
```

Playwright (Chromium only in this environment — see below):

```bash
npm run build && npm run start           # tests expect a server on :3000
npx playwright test                       # full suite
npx playwright test tests/e2e/home.spec.ts             # one file
npx playwright test -g "displays the contact form"     # one test by title
npx playwright test --ui                                # interactive runner
```

`playwright.config.ts` runs only the `chromium` project — `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` has no firefox/webkit binaries in this environment. Restore those projects if the binaries are ever installed. Its `webServer` reuses whatever is already listening on :3000 rather than spawning `next dev`, so start the production server yourself first when running tests.

## Architecture

**Shell.** `app/layout.tsx` renders `Navigation`, `Footer`, and wraps page content in `PageColumn` (`components/PageColumn.tsx`), which centers a 680px column and wraps children in `PageFade` (`components/PageFade.tsx`) for the route-load animation. `ThemeProvider` (next-themes, `attribute="class"`) and `FeatureFlagProvider` wrap everything above `Navigation`.

**Content pipeline.** Project case studies are MDX files in `content/projects/*.mdx` with YAML frontmatter. `lib/mdx.ts` reads and parses them (`gray-matter`) and compiles MDX via `next-mdx-remote/rsc`; `lib/content.ts` (`getAllProjects`, `getProjectBySlug`, `getFeaturedProjects`) turns frontmatter into the `Project` type (`types/index.ts`) and is what pages and `generateStaticParams` call. Frontmatter fields: `title`, `description`, `longDescription?`, `screenshot?` (optional path under `/images/projects/` — **`image` does not exist**, don't reintroduce it), `tags[]`, `techStack[]`, `demoUrl?`, `repoUrl?`, `featured`, `date`. Non-project facts (experience, skills) live in `content/data/*.json` and are imported directly by `app/about/about-content.tsx`.

**Feature flags.** `lib/feature-flags/config.ts` defines `FeatureFlags = { projects, contact, about, analytics }`, all `true` by default, overridable via `NEXT_PUBLIC_FEATURE_PROJECTS` / `_CONTACT` / `_ABOUT` / `_ANALYTICS` (`'false'` disables). There is no `writing`/`blog` flag — that module was removed; do not add routes or nav items for it. Server code calls `getFeatureFlags()` from `@/lib`; client components use `useFeatureFlags()`/`useFeatureFlag()` from `@/lib/feature-flags`, backed by `FeatureFlagProvider`.

**Site config.** `lib/site-config.ts` is the single source of truth for name, title, description, author bio, social links, and `navigationItems` (Home/About/Projects/Contact, each with its feature flag). Don't hardcode the name, email or social URLs elsewhere — import from here.

**SEO surfaces.** `app/opengraph-image.tsx` renders the OG image with `next/og` using the paper/ink/body-secondary hex values directly (no CSS variables in that runtime). `components/StructuredData.tsx` emits two JSON-LD blocks in `<head>`: a `Person` (with `worksFor: Herd HR`, address, alumniOf, and `knowsAbout` built from `content/data/skills.json`) and a `WebSite`. Each project detail page adds its own `SoftwareSourceCode` JSON-LD. `app/robots.ts` and `app/sitemap.ts` are the App Router metadata routes (sitemap includes static pages plus every project slug). `public/llms.txt` is a static, hand-maintained plain-text summary — update it when projects or top-level pages change.

**Contact.** `components/ContactForm.tsx` posts to `app/api/contact/route.ts`, which rate-limits by IP (in-memory `Map`, 5 requests / 15 min — resets on redeploy, not for production scale), validates with `lib/validation.ts` (zod), and sends via `lib/email.ts` (`EmailService`, providers: `console` | `nodemailer` | `formspree`). Env vars: `NEXT_PUBLIC_CONTACT_EMAIL`, and either `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` or `FORMSPREE_ENDPOINT`. See `.env.example`.

**Theme.** next-themes with `attribute="class"` and `defaultTheme="system"`. Tokens live in `app/globals.css` as CSS custom properties, redefined both under `@media (prefers-color-scheme: dark)` (system dark) and under `.dark`/`[data-theme="dark"]` (explicit toggle via `ThemeToggle`, a plain text "Dark"/"Light" link — no icon, no motion).

## Design system

This is a restrained, editorial, single-column site. Read `app/globals.css` before touching any styling.

**Tokens** (light / dark hex, defined as CSS variables and exposed as Tailwind colors `bg-*`/`text-*`/`border-*`):

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#F4F2ED` | `#161512` | page background |
| `ink` | `#1D1B17` | `#E9E5DB` | primary text, headings |
| `body-secondary` | `#504C43` | `#C9C4B8` | paragraph copy that isn't primary ink |
| `muted` | `#6E6A60` | `#9A958A` | labels, secondary metadata |
| `faint` | `#8C877B` | `#7E7A70` | least prominent text (e.g. tech-stack lists) |
| `hairline` | `#D9D5CB` | `#2E2C27` | row/section dividers |
| `hairline-strong` | `#B5B0A3` | `#4A473F` | link underline color, input borders |
| `screenshot-fill` | `#E6E2D8` | `#242219` | placeholder fill behind project screenshots, inline code background |
| `moss` | `#2E5B4C` | `#7FB59F` | **link hover only** — never a default text or background color |

**Fonts.** Three Google fonts loaded in `app/layout.tsx` as CSS variables (`--font-serif`, `--font-sans`, `--font-mono`), exposed as Tailwind utilities:
- `font-serif` — Instrument Serif, weight 400 only, used for all headings (`h1`–`h6` are forced to it and to weight 400 in `globals.css`) and a couple of large display moments (e.g. the contact email link). **Never bold.**
- `font-sans` — Instrument Sans, the body default (set on `<body>`).
- `font-mono` — Geist Mono, used for date/year columns, section labels, and tech-stack strings.

**Section labels.** The recipe used everywhere ("At a glance", "How I work", "Experience", etc.): `font-mono text-xs uppercase tracking-[0.08em] text-muted`.

**List-row pattern.** Repeated for experience, projects, "at a glance" facts: a `grid` with a fixed-width mono metadata column (`96px` for dates/years on project rows, `128px` for longer labels) and a `minmax(0,1fr)` content column, rows separated by `border-t border-hairline` (plus a trailing `border-b` on the last row), `sm:` breakpoint collapses to a single column on mobile.

**Layout.** Single column, `max-w-[680px]`, centered, `px-5` side padding (`components/PageColumn.tsx`). Don't introduce a second column, sidebar, or grid-of-cards layout.

**Never** (if you find yourself reaching for one of these, stop and use the list-row/text pattern instead):
- cards, drop shadows, gradients, pill/badge shapes, rounded corners
- colored status badges, icon libraries (no lucide-react etc.), emoji, stock photography
- centred text blocks
- `framer-motion` or any JS animation library — it was removed on purpose
- inline color styles (`style={{ color: ... }}`) — colors come from the CSS variables/Tailwind tokens above
- polling `MutationObserver`/manual DOM watching for theme state — next-themes' `class` attribute + CSS variables handle it

**Motion** is limited to exactly two things: the `PageFade` route-load fade-and-rise (`animate-page-fade-rise` in `globals.css`, respects `prefers-reduced-motion`), and the 150ms `color`/`text-decoration-color` transition on link hover defined globally on `a`. Nothing else animates.

**Copy** for Home and About lives directly in the page/content components (`app/page.tsx`, `app/about/about-content.tsx`) as plain strings and arrays — there is no CMS. Structured facts (work history, skills) come from `content/data/experience.json` and `content/data/skills.json`; edit those files rather than hardcoding new experience/skill entries in JSX.

## Known gaps

- `/cv.pdf` is linked from the home, about, and footer components but the file does not exist in `public/`. Add it or remove the links.
- No project's frontmatter sets `screenshot` yet, and no files exist under `public/images/projects/` — the screenshot block on the project detail page is unused until both are added.
- LinkUp (`content/projects/linkup.mdx`) has no public repository; its meta block correctly falls back to "Private repository" when `repoUrl`/`demoUrl` are unset — don't add a placeholder URL.
