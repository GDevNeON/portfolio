# External Integrations

**Analysis Date:** 2026-06-05

## APIs & External Services

**Email Delivery:**
- EmailJS - Sends contact form messages without an application backend.
  - SDK/Client: `@emailjs/browser` imported in `src/pages/Contact.tsx`.
  - Auth/config: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
  - Invocation: `emailjs.send(serviceId, templateId, { email, message }, { publicKey })` in `src/pages/Contact.tsx`.
  - Test mock: `tests/setup.ts` replaces `@emailjs/browser` with `tests/mocks/emailjs.ts`.
  - Documentation: `README.md` includes EmailJS setup instructions and required Vite env var names.

**External Links and Profiles:**
- Google Drive - CV folder URL stored in `src/siteConfig.ts` as `siteConfig.cvUrl`.
- GitHub - Project repository links and profile URL stored in `src/siteConfig.ts`; static navbar placeholder link is in `src/components/NavbarIcons.tsx`.
- LinkedIn - Profile URL stored in `src/siteConfig.ts`; static navbar placeholder link is in `src/components/NavbarIcons.tsx`.
- Facebook - Profile URL stored in `src/siteConfig.ts`.
- Open Graph URL placeholder - `https://your-domain.com` is hard-coded in `src/components/MetaTags.tsx`.

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.

**File Storage:**
- Static image assets are bundled from `src/assets/*` and `public/neon-icon.png`.
- Local planning/tooling artifact `data/state_store.db/mem%3Ahealth.bin` exists outside application source; no app import or runtime reference is detected.

**Caching:**
- Browser `localStorage` persists theme selection in `src/contexts/ThemeContext.tsx` under the `theme` key.
- Browser `localStorage` stores contact form rate-limit state in `src/pages/Contact.tsx` under the `contact_email_rate_limit` key.
- No server-side cache, Redis client, CDN config, or service worker cache is detected.

## Authentication & Identity

**Auth Provider:**
- Not detected.
  - Implementation: No login, session, token validation, or identity provider integration is present in `src/`.

## Monitoring & Observability

**Error Tracking:**
- None detected.

**Logs:**
- No logging framework is configured in `package.json`.
- UI-level error containment exists through `src/components/ErrorBoundary.tsx`; no external telemetry sink is detected.

## CI/CD & Deployment

**Hosting:**
- Not detected in repo configuration.
- Production build is a Vite static build from `package.json` script `build`, outputting to `dist/`.

**CI Pipeline:**
- None detected.
- No `.github/workflows` directory is present.

## Environment Configuration

**Required env vars:**
- `VITE_EMAILJS_SERVICE_ID` - EmailJS service identifier used by `src/pages/Contact.tsx`.
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template identifier used by `src/pages/Contact.tsx`.
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS browser public key used by `src/pages/Contact.tsx`.

**Secrets location:**
- `.env.local` file present - contains local environment configuration and must not be read or committed with secret values.
- `.env.example` file present - documents environment variable names.
- Tests inject non-secret placeholder values with `vi.stubEnv` in `tests/pages/Contact.test.tsx`.

## Webhooks & Callbacks

**Incoming:**
- None detected. This repo contains no backend server, API route, or webhook endpoint.

**Outgoing:**
- EmailJS browser API call from `src/pages/Contact.tsx`.
- Static outbound links to Google Drive, GitHub, LinkedIn, and Facebook from `src/siteConfig.ts` and `src/components/NavbarIcons.tsx`.

---

*Integration audit: 2026-06-05*
