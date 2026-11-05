# Codebase Structure

**Analysis Date:** 2026-06-05

## Directory Layout

```text
neon-portfolio/
├── .planning/             # GSD planning and codebase map documents
├── data/                  # Local data store directories outside the React app
├── dist/                  # Vite build output
├── node_modules/          # Installed npm dependencies
├── public/                # Static public assets served from site root
├── src/                   # React application source
│   ├── animations/        # Empty reserved animation directory
│   ├── assets/            # Imported image assets bundled by Vite
│   ├── components/        # Reusable UI and behavior components
│   ├── contexts/          # React context providers and hooks
│   ├── hooks/             # Empty reserved hooks directory
│   ├── pages/             # Route-level page components
│   ├── styles/            # Global CSS files grouped by feature/section
│   ├── App.css            # App-level CSS import
│   ├── App.tsx            # React Router route declarations
│   ├── index.css          # Global root CSS
│   ├── main.tsx           # Browser React bootstrap
│   └── siteConfig.ts      # Portfolio content/config model
├── tests/                 # Vitest and Testing Library tests/utilities
├── .env.example           # Example environment variable names
├── .env.local             # Local environment configuration, contents not read
├── eslint.config.js       # ESLint flat config
├── index.html             # Vite HTML entry
├── package-lock.json      # npm lockfile
├── package.json           # npm scripts and dependencies
├── tsconfig.app.json      # Browser TypeScript configuration
├── tsconfig.json          # TypeScript project references
├── tsconfig.node.json     # Node/tooling TypeScript configuration
└── vite.config.ts         # Vite, React plugin, and Vitest configuration
```

## Directory Purposes

**`src`:**
- Purpose: Contains all React app implementation code.
- Contains: Root bootstrap, routing, pages, components, contexts, CSS, config, and app assets.
- Key files: `src/main.tsx`, `src/App.tsx`, `src/siteConfig.ts`.

**`src/pages`:**
- Purpose: Own route-level screens.
- Contains: Components rendered directly by routes in `src/App.tsx`.
- Key files: `src/pages/Home.tsx`, `src/pages/Contact.tsx`.

**`src/components`:**
- Purpose: Own reusable UI, layout, visual effects, and cross-cutting render components.
- Contains: Shell, metadata, error boundary, theme toggle, snackbar, project image stacks, background/device helpers.
- Key files: `src/components/AppShell.tsx`, `src/components/ErrorBoundary.tsx`, `src/components/MetaTags.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Snackbar.tsx`, `src/components/GlassStack.tsx`, `src/components/GlassStackVertical.tsx`, `src/components/DeviceSupportFrame.tsx`.

**`src/contexts`:**
- Purpose: Own React context state and context access hooks.
- Contains: Shared provider/hook modules.
- Key files: `src/contexts/ThemeContext.tsx`.

**`src/styles`:**
- Purpose: Own global CSS split by design area or component family.
- Contains: Variables, base layout, navbar, hero, projects, about, contact, footer, snackbar, animations, device/project media CSS.
- Key files: `src/styles/variables.css`, `src/styles/base.css`, `src/styles/navbar.css`, `src/styles/hero.css`, `src/styles/projects.css`, `src/styles/contact.css`.

**`src/assets`:**
- Purpose: Own image assets imported by TypeScript modules and bundled by Vite.
- Contains: Project screenshots/images and personal photo.
- Key files: `src/assets/proj_mobile_1.jpg`, `src/assets/proj_web_1.jpg`, `src/assets/proj_game_1.png`, `src/assets/personal_photo.jpg`.

**`src/animations`:**
- Purpose: Reserved directory for animation code.
- Contains: No files detected.
- Key files: Not applicable.

**`src/hooks`:**
- Purpose: Reserved directory for reusable React hooks.
- Contains: No files detected.
- Key files: Not applicable.

**`public`:**
- Purpose: Own static files served from the site root without import processing.
- Contains: Brand icon.
- Key files: `public/neon-icon.png`.

**`tests`:**
- Purpose: Own Vitest test suites, setup, mocks, and custom render utilities.
- Contains: Page tests, context tests, setup file, EmailJS mock, browser mocks, test render helpers.
- Key files: `tests/setup.ts`, `tests/utils/test-utils.tsx`, `tests/utils/browser-mocks.ts`, `tests/mocks/emailjs.ts`, `tests/pages/Contact.test.tsx`, `tests/pages/smoke.test.tsx`, `tests/contexts/ThemeContext.test.tsx`.

**`data`:**
- Purpose: Local data store directories outside the Vite source tree.
- Contains: `data/state_store.db`, `data/stream_store`.
- Key files: Not detected; listed entries are directories.

**`.planning`:**
- Purpose: GSD planning artifacts and codebase reference documents.
- Contains: Codebase map output under `.planning/codebase`.
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`.

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell with the React root mount point.
- `src/main.tsx`: Imports global CSS and renders the provider-wrapped app.
- `src/App.tsx`: Declares browser routes for `/` and `/contact`.
- `src/pages/Home.tsx`: Home route page component.
- `src/pages/Contact.tsx`: Contact route page component.

**Configuration:**
- `package.json`: npm scripts, runtime dependencies, and dev dependencies.
- `package-lock.json`: npm dependency lockfile.
- `vite.config.ts`: Vite React plugin and Vitest jsdom test config.
- `tsconfig.json`: TypeScript project references.
- `tsconfig.app.json`: Browser app compiler options and `src` include.
- `tsconfig.node.json`: Node/tooling compiler options.
- `eslint.config.js`: ESLint flat config for TypeScript and React hooks.
- `.env.example`: Example environment configuration.
- `.env.local`: Local environment configuration present; contents must not be read or quoted.

**Core Logic:**
- `src/siteConfig.ts`: Central content/config source and project types.
- `src/contexts/ThemeContext.tsx`: Shared theme provider and `useTheme` hook.
- `src/components/AppShell.tsx`: Persistent layout, navigation, scroll observers, focus trap, footer.
- `src/pages/Contact.tsx`: Contact validation, local rate limiting, EmailJS integration.

**Presentation Components:**
- `src/components/GlassStack.tsx`: Interactive tilting image stack.
- `src/components/GlassStackVertical.tsx`: Click-reorderable layered project image stack.
- `src/components/DeviceSupportFrame.tsx`: Decorative frame keyed by `ProjectKind`.
- `src/components/BackgroundPanelCycler.tsx`: Timed background border panel state.
- `src/components/Snackbar.tsx`: Timed notification UI.
- `src/components/ThemeToggle.tsx`: Theme toggle button.
- `src/components/MetaTags.tsx`: Renderless document metadata updater.
- `src/components/ErrorBoundary.tsx`: Root render error fallback.

**Styling:**
- `src/index.css`: Root global CSS imported first.
- `src/App.css`: App-level CSS imported by `src/App.tsx`.
- `src/styles/variables.css`: CSS custom properties/design tokens.
- `src/styles/base.css`: Base app layout styles.
- `src/styles/navbar.css`: Navigation and mobile menu styles.
- `src/styles/hero.css`: Hero section styles.
- `src/styles/projects.css`: Project listing and stack styles.
- `src/styles/about.css`: About section styles.
- `src/styles/contact.css`: Contact page and form styles.
- `src/styles/footer.css`: Footer styles.
- `src/styles/snackbar.css`: Snackbar styles.
- `src/styles/animations.css`: Reveal/animation styles.
- `src/styles/devices.css`: Device/project media support styles.

**Testing:**
- `vite.config.ts`: Test runner configuration.
- `tests/setup.ts`: Global test setup and mocks.
- `tests/utils/test-utils.tsx`: Custom render helpers with router/theme wrappers.
- `tests/utils/browser-mocks.ts`: Browser API mocks.
- `tests/mocks/emailjs.ts`: EmailJS mock.
- `tests/pages/smoke.test.tsx`: Basic page render coverage.
- `tests/pages/Contact.test.tsx`: Contact page behavior coverage.
- `tests/contexts/ThemeContext.test.tsx`: Theme provider/hook coverage.

## Naming Conventions

**Files:**
- Use PascalCase for React component files: `src/components/AppShell.tsx`, `src/pages/Contact.tsx`, `src/components/GlassStackVertical.tsx`.
- Use camelCase for non-component modules: `src/siteConfig.ts`, `tests/utils/test-utils.tsx`, `tests/utils/browser-mocks.ts`.
- Use lowercase feature names for CSS files: `src/styles/navbar.css`, `src/styles/projects.css`, `src/styles/snackbar.css`.
- Use snake_case asset filenames grouped by project type: `src/assets/proj_mobile_1.jpg`, `src/assets/proj_game_3.png`.
- Use `.test.tsx` for tests: `tests/pages/Contact.test.tsx`, `tests/contexts/ThemeContext.test.tsx`.

**Directories:**
- Use plural directories for grouped source concerns: `src/components`, `src/contexts`, `src/pages`, `src/styles`, `src/assets`, `tests/utils`, `tests/pages`.
- Keep route tests grouped by tested area under `tests/pages` or `tests/contexts`.
- Keep imported static media under `src/assets`; keep root-served public files under `public`.

## Where to Add New Code

**New Route/Page:**
- Primary code: `src/pages`
- Route registration: `src/App.tsx`
- Shared layout changes only when persistent chrome changes: `src/components/AppShell.tsx`
- Styles: add or extend a feature CSS file under `src/styles` and import it from `src/main.tsx` if it is a new stylesheet.
- Tests: `tests/pages`

**New Home Section:**
- Primary code: `src/pages/Home.tsx`
- Content/config: `src/siteConfig.ts`
- Styles: `src/styles/*.css`, using a section-specific file if the section is substantial.
- Scroll nav integration: update `src/components/AppShell.tsx` only when the section needs a persistent nav item.
- Tests: `tests/pages/smoke.test.tsx` or a new focused test under `tests/pages`.

**New Reusable Component:**
- Implementation: `src/components`
- Component-specific styles: existing feature CSS under `src/styles`, or a new global CSS file imported by `src/main.tsx`.
- Tests: place behavior tests under `tests` grouped by consumer or concern.

**New Context/Global State:**
- Implementation: `src/contexts`
- Provider composition: `src/main.tsx`
- Consumer components: `src/components` or `src/pages`
- Tests: `tests/contexts`

**New Hook:**
- Shared helpers: `src/hooks`
- Use this directory for browser effects or stateful logic reused by more than one component.
- Tests: add focused tests under `tests` matching the hook's domain.

**New Static Content or Portfolio Item:**
- Config/content: `src/siteConfig.ts`
- Imported images: `src/assets`
- Root public files: `public`
- Rendered UI: `src/pages/Home.tsx` if the existing mapped sections already consume the config.

**New Contact Behavior:**
- Primary code: `src/pages/Contact.tsx`
- External service mock: `tests/mocks/emailjs.ts`
- Browser storage/API mocks: `tests/utils/browser-mocks.ts`
- Tests: `tests/pages/Contact.test.tsx`

**Utilities:**
- Shared helpers: create a focused module under `src/hooks` for React hooks or a new source subdirectory only when multiple files need non-hook utilities.
- Avoid adding utilities directly to `src/components` unless they render UI.

## Special Directories

**`dist`:**
- Purpose: Vite production build output.
- Generated: Yes.
- Committed: Directory exists in the workspace; treat as generated output.

**`node_modules`:**
- Purpose: Installed npm dependencies.
- Generated: Yes.
- Committed: No.

**`data`:**
- Purpose: Local state/stream store directories unrelated to the Vite app source.
- Generated: Likely yes.
- Committed: Unknown from filesystem inspection.

**`.planning/codebase`:**
- Purpose: GSD codebase reference documents consumed by planning/execution workflows.
- Generated: Yes.
- Committed: Intended to be committed by orchestrator, not by mapper.

**`src/animations`:**
- Purpose: Reserved for future animation modules.
- Generated: No.
- Committed: Directory exists but contains no files.

**`src/hooks`:**
- Purpose: Reserved for reusable React hooks.
- Generated: No.
- Committed: Directory exists but contains no files.

---

*Structure analysis: 2026-06-05*
