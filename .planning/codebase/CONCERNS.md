# Codebase Concerns

**Analysis Date:** 2026-06-05

## Tech Debt

**Contact form owns validation, rate limiting, configuration, and transport:**
- Issue: `src/pages/Contact.tsx` keeps EmailJS env lookup, input validation, localStorage rate-limit parsing, submission, and user feedback in one page component.
- Files: `src/pages/Contact.tsx`, `tests/pages/Contact.test.tsx`
- Impact: New contact behavior requires editing a UI component with several unrelated responsibilities. Rate-limit or EmailJS changes are harder to test independently from rendering.
- Fix approach: Extract `src/services/contactEmail.ts` for EmailJS transport and `src/utils/contactRateLimit.ts` for rate-window state. Keep `src/pages/Contact.tsx` responsible for form state and rendering only. Move direct unit coverage for rate-limit edge cases to `tests/utils/contactRateLimit.test.ts`.

**Hard-coded portfolio content and assets are coupled to runtime config:**
- Issue: `src/siteConfig.ts` imports all project images and stores profile text, links, UI labels, validation messages, and footer copy in one module.
- Files: `src/siteConfig.ts`, `src/pages/Home.tsx`, `src/pages/Contact.tsx`, `src/components/AppShell.tsx`
- Impact: Content-only changes trigger TypeScript rebuilds and can accidentally affect UI behavior. The single config object also carries mojibake text, which spreads corrupted strings into pages and tests.
- Fix approach: Keep typed UI config in `src/siteConfig.ts`, but move large content arrays to focused modules such as `src/content/projects.ts` and `src/content/profile.ts`. Keep display strings UTF-8 encoded and add a smoke assertion for representative Vietnamese text.

**App shell mixes navigation, focus management, layout chrome, footer, and animation background:**
- Issue: `src/components/AppShell.tsx` is the largest component and manages IntersectionObserver section tracking, mobile menu focus trap, route navigation, background animation, header, main outlet, and footer.
- Files: `src/components/AppShell.tsx`, `src/styles/navbar.css`, `src/styles/footer.css`, `src/styles/animations.css`
- Impact: Navigation fixes can affect footer rendering or animation behavior. The mobile menu behavior is difficult to test because logic and markup are not isolated.
- Fix approach: Split into `src/components/layout/HeaderNav.tsx`, `src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`, and a `src/hooks/useActiveSection.ts` hook. Add focused tests for mobile menu keyboard behavior.

**Manual SVG social icons bypass the local icon/component pattern:**
- Issue: `src/components/AppShell.tsx` embeds long SVG path data for footer social links.
- Files: `src/components/AppShell.tsx`
- Impact: The component is noisy and icon accessibility/styling is duplicated inline.
- Fix approach: Move repeated social link rendering to `src/components/SocialLinks.tsx` or use an installed icon library consistently. Keep labels and URLs sourced from `src/siteConfig.ts`.

## Known Bugs

**Vietnamese and punctuation text is mojibake-corrupted:**
- Symptoms: User-facing strings render as corrupted text such as `BÃ¹i Báº£o Long`, `Sendingâ€¦`, and malformed Vietnamese rate-limit copy.
- Files: `src/siteConfig.ts`, `src/pages/Contact.tsx`, `tests/pages/smoke.test.tsx`, `tests/pages/Contact.test.tsx`
- Trigger: Rendering home/contact pages or running tests that assert corrupted text.
- Workaround: None in code; tests currently assert the corrupted strings in several places.
- Fix approach: Re-save affected source and test files as UTF-8, replace corrupted literals with intended text, and add one regression test that asserts `Bùi Bảo Long` renders correctly.

**Contact form keeps the sender email after successful submission:**
- Symptoms: After a successful send, only `message` is cleared while `email` remains populated.
- Files: `src/pages/Contact.tsx`
- Trigger: Submit a valid contact form successfully; line 95 clears `message` but not `email`.
- Workaround: User manually deletes the email field.
- Fix approach: Decide whether retaining email is intentional. If not, call `setEmail('')` after successful send and update `tests/pages/Contact.test.tsx` to assert both fields clear.

**Mobile menu can stay open after desktop resize:**
- Symptoms: `mobileMenuOpen` can remain `true` when the viewport moves above 768px; the menu is hidden by CSS but focus-return and `aria-expanded` state remain tied to stale React state.
- Files: `src/components/AppShell.tsx`, `src/styles/navbar.css`
- Trigger: Open the mobile menu, resize above the mobile breakpoint, then inspect the toggle state or keyboard focus behavior.
- Workaround: Close the menu before resizing.
- Fix approach: Add a `matchMedia('(max-width: 768px)')` listener in the mobile menu hook/component and close the menu when it stops matching.

## Security Considerations

**EmailJS public-key client submission is abuse-prone:**
- Risk: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` are intentionally bundled into client code. Attackers can call EmailJS outside the UI and bypass local browser controls.
- Files: `src/pages/Contact.tsx`, `.env.example`, `.env.local`
- Current mitigation: LocalStorage rate limiting in `src/pages/Contact.tsx` limits normal browser use to 3 sends per 10 minutes.
- Recommendations: Prefer a serverless contact endpoint with server-side rate limiting, CAPTCHA/Turnstile, payload length limits, and provider-side allowlists. If EmailJS remains client-side, configure EmailJS domain restrictions and template-side spam controls.

**Rate limiting is client-side only and easy to bypass:**
- Risk: The `contact_email_rate_limit` value is stored in localStorage and can be edited, deleted, or avoided by another browser/device.
- Files: `src/pages/Contact.tsx`
- Current mitigation: JSON parsing fallback and a 3-message local window.
- Recommendations: Treat this as UX throttling only. Enforce real rate limits on a backend or edge function keyed by IP/user-agent/fingerprint as appropriate.

**Contact payload has no length or content constraints before third-party submission:**
- Risk: Very large messages or abusive content can be sent to EmailJS, affecting quotas and inbox quality.
- Files: `src/pages/Contact.tsx`, `src/siteConfig.ts`
- Current mitigation: Required-field and simple email-regex validation.
- Recommendations: Add `maxLength` to the email and textarea fields, trim values before validation/submission, reject blank-after-trim content, and test the boundaries in `tests/pages/Contact.test.tsx`.

**Environment file present in workspace:**
- Risk: `.env.local` exists and may contain local secrets or provider identifiers.
- Files: `.env.local`, `.env.example`
- Current mitigation: `.env.local` is present in `.gitignore`; contents were not read during this audit.
- Recommendations: Keep `.env.local` uncommitted. Rotate any provider credentials if they are accidentally committed or exposed in built assets.

## Performance Bottlenecks

**Large images are imported directly with no responsive variants:**
- Problem: `src/siteConfig.ts` imports original assets totaling about 5.18 MB, including `src/assets/proj_mobile_1.jpg` at about 1.38 MB, `src/assets/personal_photo.jpg` at about 812 KB, and `src/assets/proj_game_1.png` at about 790 KB.
- Files: `src/siteConfig.ts`, `src/assets/proj_mobile_1.jpg`, `src/assets/personal_photo.jpg`, `src/assets/proj_game_1.png`, `src/components/GlassStack.tsx`, `src/components/GlassStackVertical.tsx`
- Cause: Project/profile images are bundled as static imports and rendered without `srcset`, generated thumbnails, or explicit lazy-loading strategy at the config boundary.
- Improvement path: Generate optimized WebP/AVIF variants, expose width/height metadata, use responsive `picture`/`srcset`, and lazy-load non-hero project images.

**Continuous animation work runs on desktop:**
- Problem: `src/components/EdgeColorRunner.tsx` runs a perpetual `requestAnimationFrame` loop and `src/components/BackgroundBands.tsx` keeps spawning animated panels with timers.
- Files: `src/components/EdgeColorRunner.tsx`, `src/components/BackgroundBands.tsx`, `src/styles/animations.css`
- Cause: Decorative motion is always enabled outside the mobile CSS cutoff and does not check `prefers-reduced-motion`.
- Improvement path: Gate animation components with `window.matchMedia('(prefers-reduced-motion: reduce)')`, pause when `document.visibilityState === 'hidden'`, and add CSS reduced-motion rules in `src/styles/animations.css`.

**Blur/backdrop-heavy visual effects can degrade low-end devices:**
- Problem: Multiple fixed or large elements use `filter: blur(...)`, `backdrop-filter`, animated gradients, and shadows.
- Files: `src/styles/animations.css`, `src/styles/navbar.css`, `src/styles/base.css`, `src/styles/projects.css`, `src/styles/footer.css`
- Cause: Decorative layers and glass effects are global and stacked across the app shell.
- Improvement path: Add a reduced-effects mode tied to reduced motion or a CSS class, reduce blur radii on constrained devices, and profile paint/composite cost in browser performance tools.

## Fragile Areas

**Scroll section tracking depends on document queries and timing:**
- Files: `src/components/AppShell.tsx`, `src/pages/Home.tsx`, `src/pages/Contact.tsx`
- Why fragile: `AppShell` queries `[data-scroll-section]` in the document after route changes. When navigating from `/contact` to `/`, `scrollToSection` waits a fixed 80ms before calling `scrollIntoView`, which can race with render timing.
- Safe modification: Move section tracking and deferred scroll into a hook that reacts after route content mounts. Prefer route state such as `navigate('/', { state: { scrollTo: id } })` and consume it in `src/pages/Home.tsx`.
- Test coverage: No tests cover `AppShell` section tracking, delayed route scroll, or active nav state.

**Mobile focus trap is hand-rolled:**
- Files: `src/components/AppShell.tsx`, `src/styles/navbar.css`
- Why fragile: The focusable element list is captured only when the menu opens. If menu contents change while open, first/last focus targets can become stale. Focus returns to `previousFocusRef` even if that element is no longer connected.
- Safe modification: Extract to `src/hooks/useFocusTrap.ts`, recompute focusable elements on each Tab keydown, guard `element.isConnected`, and test Escape/Tab behavior.
- Test coverage: No tests cover mobile menu open/close, Escape handling, Tab wrapping, or focus restoration.

**Decorative timers are guarded but not cleared:**
- Files: `src/components/BackgroundBands.tsx`, `src/components/Snackbar.tsx`
- Why fragile: `BackgroundBands` uses an `active` flag but does not store and clear timeout IDs. `Snackbar` clears the first timer but nested close timers can still fire after user actions.
- Safe modification: Store timeout IDs in refs and clear them in cleanup. Keep the `active` guard as a fallback, but use explicit timer cleanup for deterministic tests.
- Test coverage: No timer cleanup tests exist for decorative components or `Snackbar`.

**Theme persistence assumes localStorage availability:**
- Files: `src/contexts/ThemeContext.tsx`, `tests/contexts/ThemeContext.test.tsx`
- Why fragile: Browser privacy modes, blocked storage, or quota issues can throw on `localStorage.getItem`/`setItem`.
- Safe modification: Wrap storage reads/writes in try/catch helpers such as `src/utils/safeStorage.ts`. Keep DOM class updates independent from storage success.
- Test coverage: Theme tests cover normal localStorage behavior but not storage exceptions.

## Scaling Limits

**Static single-page portfolio content scales poorly as content grows:**
- Current capacity: Three projects and one profile image set are hard-coded in `src/siteConfig.ts`.
- Limit: Adding many projects increases bundle size and makes content updates code changes.
- Scaling path: Move project data to content modules or JSON, use dynamic imports for project image groups, and add route-level or component-level lazy loading for project media.

**Client-only contact form cannot enforce global quotas:**
- Current capacity: 3 local successful sends per 10 minutes per browser storage profile.
- Limit: Any user can bypass the limit by clearing localStorage, switching browsers/devices, or calling EmailJS directly.
- Scaling path: Introduce a server-side contact API with provider quota handling, structured validation, and observability.

## Dependencies at Risk

**React 19 plus testing-library/jsdom versions require active maintenance:**
- Risk: The app uses React `^19.2.0`, `@testing-library/react` `^16.3.2`, `jsdom` `^29.1.1`, and Vitest `^4.1.5`.
- Impact: Test environment behavior can shift as caret ranges install newer versions; UI tests around `act`, timers, and jsdom APIs may break after dependency updates.
- Migration plan: Keep `package-lock.json` committed, run `npm test` and `npm run build` after dependency updates, and pin versions when CI stability matters.

**EmailJS dependency is part of the public client runtime:**
- Risk: `@emailjs/browser` is a third-party client SDK in a public page.
- Impact: Provider API changes or quota policy changes directly affect the contact form.
- Migration plan: Wrap EmailJS in `src/services/contactEmail.ts` so the UI is isolated from provider changes and can move to a backend endpoint later.

## Missing Critical Features

**No production-grade spam prevention for contact submissions:**
- Problem: The contact form lacks CAPTCHA/Turnstile, server-side throttling, honeypot fields, payload-size limits, and content filtering.
- Blocks: Reliable public deployment of the contact form under abuse or scraping.
- Files: `src/pages/Contact.tsx`, `.env.example`

**No CI configuration detected:**
- Problem: No GitHub Actions, GitLab CI, or similar pipeline files were found in the scanned root listing.
- Blocks: Automated enforcement of `npm run build`, `npm run lint`, and `npm test:run` before deployment.
- Files: `package.json`, `vite.config.ts`

**No explicit error reporting or runtime observability:**
- Problem: `src/components/ErrorBoundary.tsx` renders fallback UI, but no external reporting or structured logging integration is present.
- Blocks: Production errors in deployed portfolio sessions are not collected.
- Files: `src/components/ErrorBoundary.tsx`, `src/App.tsx`

## Test Coverage Gaps

**App shell navigation and accessibility behavior:**
- What's not tested: Header navigation, mobile menu open/close, Escape handling, Tab focus wrapping, focus restoration, route-to-section scrolling, and active section updates.
- Files: `src/components/AppShell.tsx`, `tests/pages/smoke.test.tsx`
- Risk: Navigation accessibility regressions can ship unnoticed.
- Priority: High

**Reduced motion and decorative animation cleanup:**
- What's not tested: `requestAnimationFrame` cancellation, timeout cleanup, reduced-motion behavior, and visibility pause behavior.
- Files: `src/components/EdgeColorRunner.tsx`, `src/components/BackgroundBands.tsx`, `src/components/Snackbar.tsx`, `src/styles/animations.css`
- Risk: Performance or memory regressions can ship unnoticed, especially on long-lived sessions.
- Priority: Medium

**Storage failure paths:**
- What's not tested: `localStorage` throwing in theme initialization, theme persistence, or contact rate-limit reads/writes.
- Files: `src/contexts/ThemeContext.tsx`, `src/pages/Contact.tsx`, `tests/contexts/ThemeContext.test.tsx`, `tests/pages/Contact.test.tsx`
- Risk: Users with blocked storage can see broken theme or contact behavior.
- Priority: Medium

**Home/project media behavior:**
- What's not tested: Image fallback behavior, lazy-loading behavior, project links, and media rendering across project kinds.
- Files: `src/pages/Home.tsx`, `src/components/GlassStack.tsx`, `src/components/GlassStackVertical.tsx`, `src/siteConfig.ts`
- Risk: Broken images or invalid project links can ship unnoticed.
- Priority: Low

---

*Concerns audit: 2026-06-05*
