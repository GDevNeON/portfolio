<!-- refreshed: 2026-06-05 -->
# Architecture

**Analysis Date:** 2026-06-05

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                   Vite React Browser App                    │
│                  `index.html`, `src/main.tsx`               │
├──────────────────┬──────────────────┬───────────────────────┤
│  Provider Shell  │  Route Layout    │      Page Routes      │
│ `ThemeProvider`  │  `AppShell`      │ `Home`, `Contact`     │
│ `ErrorBoundary`  │                  │                       │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                Presentation Components                      │
│  `src/components/*`, `src/styles/*`, `src/assets/*`         │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│            Static Config, Browser State, EmailJS             │
│  `src/siteConfig.ts`, `localStorage`, `@emailjs/browser`    │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root renderer | Mounts React into `#root`, imports global CSS, wraps the app in `StrictMode`, `ThemeProvider`, `ErrorBoundary`, and `MetaTags`. | `src/main.tsx` |
| Router | Declares the browser routes and nests pages inside the shared layout route. | `src/App.tsx` |
| App shell | Owns persistent navigation, mobile menu state, section activation, reveal observers, background panel, routed `<Outlet />`, and footer. | `src/components/AppShell.tsx` |
| Home page | Renders hero, stack, projects, and about sections from `siteConfig`; delegates project imagery to glass/device components. | `src/pages/Home.tsx` |
| Contact page | Owns contact form state, validation, local client rate limiting, EmailJS send call, and snackbar feedback. | `src/pages/Contact.tsx` |
| Site config | Central static content model for identity, project data, labels, links, images, and typed `ProjectKind`/`Project` shapes. | `src/siteConfig.ts` |
| Theme context | Stores light/dark mode in React context, syncs the root class, and persists the value in `localStorage`. | `src/contexts/ThemeContext.tsx` |
| Error boundary | Catches render errors below the provider tree and displays a retry UI. | `src/components/ErrorBoundary.tsx` |
| Meta tags | Updates document title and meta/Open Graph tags as a renderless component. | `src/components/MetaTags.tsx` |
| Visual project components | Render layered image stacks, device support frames, and interactive image ordering/tilt states. | `src/components/GlassStack.tsx`, `src/components/GlassStackVertical.tsx`, `src/components/DeviceSupportFrame.tsx` |
| Feedback component | Displays timed success/error notifications for contact form outcomes. | `src/components/Snackbar.tsx` |

## Pattern Overview

**Overall:** Client-only Vite React single-page application with route-level pages, a shared layout shell, static configuration data, and coarsely grouped global CSS.

**Key Characteristics:**
- Use `src/main.tsx` as the only browser bootstrap; provider composition belongs at this layer.
- Use `src/App.tsx` for route declarations only; page behavior belongs in `src/pages/*`.
- Use `src/components/AppShell.tsx` for persistent chrome and scroll/navigation behavior.
- Use `src/siteConfig.ts` as the source of portfolio content and image imports; pages should map config data instead of hard-coding repeated content.
- Use React local state for UI-only interactions; the only shared app state is theme context.
- Use global CSS files imported from `src/main.tsx`; component JSX references class names rather than CSS modules.

## Layers

**HTML and Build Entry:**
- Purpose: Host the root DOM node and hand control to Vite.
- Location: `index.html`, `vite.config.ts`
- Contains: HTML shell, Vite React plugin, Vitest configuration.
- Depends on: Vite, React plugin.
- Used by: `npm run dev`, `npm run build`, `npm run test`.

**React Bootstrap:**
- Purpose: Import global styles and mount the app with cross-cutting wrappers.
- Location: `src/main.tsx`
- Contains: CSS imports, `createRoot`, `StrictMode`, `ThemeProvider`, `ErrorBoundary`, `MetaTags`, `App`.
- Depends on: `react`, `react-dom/client`, `src/App.tsx`, `src/contexts/ThemeContext.tsx`, `src/components/ErrorBoundary.tsx`, `src/components/MetaTags.tsx`.
- Used by: Vite via the script module referenced by `index.html`.

**Routing:**
- Purpose: Define route paths and layout nesting.
- Location: `src/App.tsx`
- Contains: `BrowserRouter`, `Routes`, parent layout route, `/`, and `/contact`.
- Depends on: `react-router-dom`, `src/components/AppShell.tsx`, `src/pages/Home.tsx`, `src/pages/Contact.tsx`.
- Used by: `src/main.tsx`.

**Layout and Navigation:**
- Purpose: Keep navigation, footer, background layer, mobile menu focus handling, and scroll section tracking consistent across pages.
- Location: `src/components/AppShell.tsx`
- Contains: `useLocation`, `useNavigate`, `Outlet`, `IntersectionObserver`, mobile focus trap, smooth scrolling, social footer links.
- Depends on: `react`, `react-router-dom`, `src/siteConfig.ts`, `src/components/ThemeToggle.tsx`, `src/components/BackgroundPanelCycler.tsx`.
- Used by: `src/App.tsx`.

**Pages:**
- Purpose: Compose complete route screens from config data and reusable components.
- Location: `src/pages`
- Contains: `Home.tsx`, `Contact.tsx`.
- Depends on: `src/siteConfig.ts`, `src/components/*`, `react-router-dom`, `@emailjs/browser` for `Contact.tsx`.
- Used by: `src/App.tsx`.

**Components:**
- Purpose: Encapsulate reusable UI and behavior that is shared or complex enough to isolate from pages.
- Location: `src/components`
- Contains: layout helpers, visual effects, feedback, theme toggle, error boundary, metadata updater.
- Depends on: React hooks, `src/siteConfig.ts` types where needed, CSS class names in `src/styles/*`.
- Used by: `src/main.tsx`, `src/components/AppShell.tsx`, and `src/pages/*`.

**Configuration and Assets:**
- Purpose: Keep portfolio content and static media centralized.
- Location: `src/siteConfig.ts`, `src/assets`, `public/neon-icon.png`
- Contains: project data, copy, social URLs, imported image modules, public brand icon.
- Depends on: Vite asset import handling.
- Used by: `src/pages/Home.tsx`, `src/pages/Contact.tsx`, `src/components/AppShell.tsx`, `src/components/MetaTags.tsx`.

**Global Styling:**
- Purpose: Provide design tokens, layout rules, page sections, component styles, animations, and responsive device/project styles.
- Location: `src/index.css`, `src/App.css`, `src/styles/*.css`
- Contains: variables, base reset/layout, navbar, hero, project, about, contact, footer, snackbar, animation, and device CSS.
- Depends on: class names emitted by JSX.
- Used by: `src/main.tsx`, `src/App.tsx`.

**Tests:**
- Purpose: Verify pages, contact behavior, and theme context using Vitest and Testing Library.
- Location: `tests`
- Contains: page tests, context tests, setup, browser mocks, EmailJS mock, render utilities.
- Depends on: `vite.config.ts` test configuration, `tests/setup.ts`.
- Used by: `npm run test`, `npm run test:run`, `npm run test:ui`.

## Data Flow

### Primary App Render Path

1. Vite loads the root module from `index.html` and `src/main.tsx` mounts the React tree (`src/main.tsx:20`).
2. `src/main.tsx` wraps `App` with `ThemeProvider`, `ErrorBoundary`, and `MetaTags` (`src/main.tsx:22`).
3. `src/App.tsx` creates a `BrowserRouter` and defines the shared `AppShell` route (`src/App.tsx:9`).
4. `src/App.tsx` resolves `/` to `Home` or `/contact` to `Contact` (`src/App.tsx:12`, `src/App.tsx:13`).
5. `src/components/AppShell.tsx` renders persistent navigation, `<Outlet />`, and footer (`src/components/AppShell.tsx:227`).

### Home Page Content Flow

1. `src/pages/Home.tsx` imports `siteConfig` and reusable visual components (`src/pages/Home.tsx:1`).
2. Hero, stack, project, and about sections read labels, copy, links, and image arrays from `siteConfig` (`src/pages/Home.tsx:6`).
3. Projects are rendered by mapping `siteConfig.projects` (`src/pages/Home.tsx:96`).
4. Project images flow into `GlassStackVertical` and `DeviceSupportFrame` (`src/pages/Home.tsx:113`).

### Contact Submission Flow

1. `src/pages/Contact.tsx` stores email, message, error, submitting, and snackbar state locally (`src/pages/Contact.tsx:8`).
2. EmailJS credentials are read from Vite env names in `import.meta.env` (`src/pages/Contact.tsx:19`).
3. `handleSend` validates required fields and email shape before any network request (`src/pages/Contact.tsx:26`).
4. Client-side rate limiting reads and writes `localStorage` under `contact_email_rate_limit` (`src/pages/Contact.tsx:22`, `src/pages/Contact.tsx:57`).
5. Valid submissions call `emailjs.send` and update snackbar state on success or failure (`src/pages/Contact.tsx:80`).

### Theme Flow

1. `ThemeProvider` initializes state from `localStorage.getItem('theme')` (`src/contexts/ThemeContext.tsx:20`).
2. Theme changes update `document.documentElement` classes and persist the value (`src/contexts/ThemeContext.tsx:26`).
3. `ThemeToggle` reads the context via `useTheme` and calls `toggleTheme` on click (`src/components/ThemeToggle.tsx:4`).

**State Management:**
- Shared state is limited to `theme` in `src/contexts/ThemeContext.tsx`.
- Route state is managed by `react-router-dom` in `src/App.tsx` and consumed by `src/components/AppShell.tsx`.
- Page/component interaction state stays local with `useState` in files such as `src/pages/Contact.tsx`, `src/components/GlassStackVertical.tsx`, and `src/components/BackgroundPanelCycler.tsx`.
- Browser storage is used for theme persistence and contact rate limiting only.

## Key Abstractions

**Site Configuration:**
- Purpose: Represents portfolio content, project metadata, social links, and display labels.
- Examples: `src/siteConfig.ts`, consumed by `src/pages/Home.tsx`, `src/pages/Contact.tsx`, `src/components/AppShell.tsx`.
- Pattern: Single exported object plus exported TypeScript types (`ProjectKind`, `Project`).

**Route Shell:**
- Purpose: Separates persistent page chrome from route content.
- Examples: `src/components/AppShell.tsx`, `src/App.tsx`.
- Pattern: React Router parent route with `<Outlet />`.

**Theme Context:**
- Purpose: Exposes the current theme and toggle command to components without prop drilling.
- Examples: `src/contexts/ThemeContext.tsx`, `src/components/ThemeToggle.tsx`.
- Pattern: React context with a guard in `useTheme`.

**Visual Stack Components:**
- Purpose: Encapsulate layered image UI and interactions for project/about imagery.
- Examples: `src/components/GlassStack.tsx`, `src/components/GlassStackVertical.tsx`.
- Pattern: Typed props, memoized normalized image arrays, internal load/interaction state.

**Feedback Boundary:**
- Purpose: Keep error and notification concerns out of normal page markup.
- Examples: `src/components/ErrorBoundary.tsx`, `src/components/Snackbar.tsx`.
- Pattern: Class error boundary for render errors; functional timed snackbar for user feedback.

## Entry Points

**Browser HTML:**
- Location: `index.html`
- Triggers: Vite dev server or built bundle loading in the browser.
- Responsibilities: Provide `#root` and load `src/main.tsx`.

**React Root:**
- Location: `src/main.tsx`
- Triggers: Browser module execution.
- Responsibilities: Import all global CSS, compose providers, and render `App`.

**Application Router:**
- Location: `src/App.tsx`
- Triggers: React root render.
- Responsibilities: Define `BrowserRouter`, route nesting, and route-to-page mapping.

**Home Route:**
- Location: `src/pages/Home.tsx`
- Triggers: Visiting `/`.
- Responsibilities: Render the portfolio landing content from `siteConfig`.

**Contact Route:**
- Location: `src/pages/Contact.tsx`
- Triggers: Visiting `/contact`.
- Responsibilities: Render and submit the contact form through EmailJS.

**Test Entrypoint:**
- Location: `vite.config.ts`
- Triggers: `vitest` scripts in `package.json`.
- Responsibilities: Configure jsdom environment, globals, setup file, and test include pattern.

## Architectural Constraints

- **Threading:** The app uses the browser's single-threaded React event loop. No web workers are detected.
- **Global state:** Theme state is exposed globally through `src/contexts/ThemeContext.tsx`; root theme classes and metadata are mutated through browser globals in `src/contexts/ThemeContext.tsx` and `src/components/MetaTags.tsx`.
- **Browser APIs:** `src/components/AppShell.tsx` uses `document`, `window.matchMedia`, `IntersectionObserver`, and focus APIs; tests need jsdom/browser mocks for these behaviors.
- **Persistence:** `localStorage` is used in `src/contexts/ThemeContext.tsx` and `src/pages/Contact.tsx`; any server-side rendering would require guards around these browser-only calls.
- **Routing:** Navigation assumes a client-side SPA. Direct deep links require hosting fallback to `index.html`.
- **Circular imports:** No circular import chains are detected in the inspected source. Current imports flow from root to routes/layout/pages/components/config.
- **Environment variables:** Contact submission depends on `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`; `.env.local` exists but contents are intentionally not read.

## Anti-Patterns

### Hard-Coding Content Outside `siteConfig`

**What happens:** Page or shell copy, links, and project content can be hard-coded directly in JSX.
**Why it's wrong:** The current architecture centralizes content in `src/siteConfig.ts`; bypassing it splits the content source and makes tests/pages harder to update.
**Do this instead:** Add content fields to `src/siteConfig.ts` and consume them from pages such as `src/pages/Home.tsx` or shell UI in `src/components/AppShell.tsx`.

### Adding New Route UI Inside `AppShell`

**What happens:** Route-specific content can be placed in `src/components/AppShell.tsx`.
**Why it's wrong:** `AppShell` already owns persistent navigation, observers, mobile focus behavior, and footer. Route content belongs in pages to keep shell responsibilities stable.
**Do this instead:** Create a page under `src/pages`, add a route in `src/App.tsx`, and let `AppShell` render it through `<Outlet />` (`src/components/AppShell.tsx:227`).

### Duplicating Cross-Cutting Browser Effects

**What happens:** Components can independently mutate document classes, metadata, or global scroll behavior.
**Why it's wrong:** Root theme mutation belongs in `src/contexts/ThemeContext.tsx`; metadata mutation belongs in `src/components/MetaTags.tsx`; section scroll activation belongs in `src/components/AppShell.tsx`.
**Do this instead:** Extend the established owner module for the effect, or create a small reusable hook in `src/hooks` if the same browser effect needs to be shared.

### Treating Client Rate Limiting As Security

**What happens:** `src/pages/Contact.tsx` limits submissions with `localStorage`.
**Why it's wrong:** Browser storage can be cleared or bypassed; this is a UX throttle, not a security boundary.
**Do this instead:** Keep the current client throttle for feedback, and add provider-side or backend-side controls if contact abuse protection becomes a requirement.

## Error Handling

**Strategy:** Use local validation and user-visible snackbar feedback for expected interaction errors, plus a React error boundary for render-time failures.

**Patterns:**
- Throw early when context is used outside its provider (`src/contexts/ThemeContext.tsx:12`).
- Validate contact input before calling the external API (`src/pages/Contact.tsx:26`).
- Catch EmailJS failures and show configured failure text (`src/pages/Contact.tsx:95`).
- Catch render errors below the root provider tree with `ErrorBoundary` (`src/components/ErrorBoundary.tsx:12`).
- Log boundary errors through `console.error` in `componentDidCatch` (`src/components/ErrorBoundary.tsx:22`).

## Cross-Cutting Concerns

**Logging:** `src/components/ErrorBoundary.tsx` logs caught render errors with `console.error`; no centralized logging framework is detected.
**Validation:** Contact form validation is local to `src/pages/Contact.tsx`; theme context validates provider usage in `src/contexts/ThemeContext.tsx`.
**Authentication:** Not applicable. No auth layer is detected.
**SEO/Metadata:** `src/components/MetaTags.tsx` mutates document title and meta tags.
**Accessibility:** `src/components/AppShell.tsx` includes skip link and mobile focus trap behavior; `src/pages/Contact.tsx` uses labels, `aria-invalid`, `aria-describedby`, and snackbar live region through `src/components/Snackbar.tsx`.

---

*Architecture analysis: 2026-06-05*
