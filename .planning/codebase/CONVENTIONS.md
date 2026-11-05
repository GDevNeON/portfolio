# Coding Conventions

**Analysis Date:** 2026-06-05

## Naming Patterns

**Files:**
- Use PascalCase for React component and page modules: `src/components/AppShell.tsx`, `src/components/ErrorBoundary.tsx`, `src/pages/Contact.tsx`, `src/pages/Home.tsx`.
- Use camelCase for non-component TypeScript modules: `src/siteConfig.ts`, `tests/utils/test-utils.tsx`, `tests/utils/browser-mocks.ts`.
- Use feature or component-oriented CSS filenames under `src/styles/`: `src/styles/contact.css`, `src/styles/navbar.css`, `src/styles/snackbar.css`, `src/styles/devices.css`.
- Keep tests in `tests/` with `.test.tsx` suffix and a directory matching the source area: `tests/pages/Contact.test.tsx`, `tests/contexts/ThemeContext.test.tsx`.

**Functions:**
- Use PascalCase function names for React components: `AppShell` in `src/components/AppShell.tsx`, `Contact` in `src/pages/Contact.tsx`, `ThemeProvider` in `src/contexts/ThemeContext.tsx`.
- Use camelCase for hooks, handlers, utilities, and local helpers: `useTheme` in `src/contexts/ThemeContext.tsx`, `handleSend` in `src/pages/Contact.tsx`, `scrollToSection` in `src/components/AppShell.tsx`, `createMockLocalStorage` in `tests/utils/browser-mocks.ts`.
- Use `handleX` names for event handlers that are owned by a component: `handleRetry` in `src/components/ErrorBoundary.tsx`, `handleSend` in `src/pages/Contact.tsx`.

**Variables:**
- Use camelCase for state and refs: `activeSectionId`, `mobileMenuOpen`, `mobileMenuRef`, `previousFocusRef` in `src/components/AppShell.tsx`.
- Use `isX` booleans for UI state: `isSubmitting` in `src/pages/Contact.tsx`, `isVisible` in `src/components/Snackbar.tsx`.
- Use uppercase `const` names for fixed local constants: `PANEL_RUNNER_DURATION` in `src/components/BackgroundBands.tsx`, `RATE_LIMIT_KEY`, `RATE_LIMIT_MAX`, and `RATE_LIMIT_WINDOW_MS` in `src/pages/Contact.tsx`.

**Types:**
- Use `type` for unions and object shapes by default: `Theme`, `ThemeContextType` in `src/contexts/ThemeContext.tsx`, `ProjectKind`, `Project` in `src/siteConfig.ts`, `SnackbarProps` in `src/components/Snackbar.tsx`.
- Use `interface` where class component state/props or mock contract style is already established: `Props` and `State` in `src/components/ErrorBoundary.tsx`, `EmailJSTemplateParams` and `EmailJSConfig` in `tests/mocks/emailjs.ts`.
- Name component props as `[Component]Props`: `SnackbarProps` in `src/components/Snackbar.tsx`, `GlassStackProps` in `src/components/GlassStack.tsx`, `ColorBorderProps` in `src/components/ColorBorder.tsx`.

## Code Style

**Formatting:**
- No Prettier configuration is detected. Follow the existing TypeScript style: two-space indentation, single quotes, no semicolons, trailing commas in multi-line calls/objects, and compact arrow functions where readable.
- JSX props are split across multiple lines when an element has several attributes, as in `src/components/AppShell.tsx` and `src/components/Snackbar.tsx`.
- Keep module files focused and export the primary component as the default export from component/page files, as in `src/components/ThemeToggle.tsx` and `src/pages/Home.tsx`.
- CSS uses camelCase class names with modifier-style suffixes where needed: `.contactHeader`, `.panelInput--area`, `.snackbar--visible`, `.errorBoundaryButton--primary`.

**Linting:**
- Use ESLint flat config from `eslint.config.js`.
- ESLint applies to `**/*.{ts,tsx}` and ignores `dist`.
- Enabled rule sets: `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-react-hooks` flat recommended, and `eslint-plugin-react-refresh` Vite config.
- TypeScript compiler quality settings live in `tsconfig.app.json`: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, and `erasableSyntaxOnly` are enabled.
- Run `npm run lint` before shipping TypeScript changes.

## Import Organization

**Order:**
1. External library imports first: React, React Router, EmailJS, Vitest, Testing Library (`src/pages/Contact.tsx`, `tests/pages/Contact.test.tsx`).
2. Static CSS imports near the top in entry modules: `src/main.tsx`, `src/App.tsx`.
3. Project modules after external imports, using relative paths: `../siteConfig`, `../components/Snackbar`, `../../src/pages/Contact`.
4. Type-only imports should use `type` when imported from a value module: `src/components/ErrorBoundary.tsx`, `src/components/BackgroundBands.tsx`, `src/components/DeviceFrame.tsx`.

**Path Aliases:**
- Not detected. `tsconfig.app.json` does not define path aliases; use relative imports.
- Source tests import production code through relative paths from `tests/`, such as `../../src/pages/Contact` in `tests/pages/Contact.test.tsx`.

## Error Handling

**Patterns:**
- Use an app-level class `ErrorBoundary` for render-time failures. It logs via `console.error` and renders a retry UI in `src/components/ErrorBoundary.tsx`.
- Throw explicit hook misuse errors for provider-bound hooks. `useTheme` throws `new Error('useTheme must be used within a ThemeProvider')` in `src/contexts/ThemeContext.tsx`.
- For user-facing async errors, catch failures and show state-driven UI feedback instead of throwing. `handleSend` catches EmailJS failures and sets an error snackbar in `src/pages/Contact.tsx`.
- For recoverable browser storage parsing errors, catch and reset to a neutral state. The rate-limit parser in `src/pages/Contact.tsx` catches invalid `localStorage` JSON and uses `null`.
- Validate required environment configuration before calling external APIs. `src/pages/Contact.tsx` checks `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.

## Logging

**Framework:** console

**Patterns:**
- Use `console.error` only for unexpected application errors that need developer visibility, as in `src/components/ErrorBoundary.tsx`.
- Do not log expected validation errors in user flows; present those through UI state and snackbar messages, as in `src/pages/Contact.tsx`.
- Tests may temporarily suppress expected React error output with `vi.spyOn(console, 'error')`, as in `tests/contexts/ThemeContext.test.tsx`.

## Comments

**When to Comment:**
- Use short comments to explain non-obvious browser or animation behavior: IntersectionObserver thresholds and focus trapping in `src/components/AppShell.tsx`, animation timing in `src/components/Snackbar.tsx`.
- Use comments in tests to explain mocked browser APIs or intentionally expected errors: `tests/pages/smoke.test.tsx`, `tests/contexts/ThemeContext.test.tsx`.
- Keep comments close to the behavior they explain; avoid restating simple assignments.

**JSDoc/TSDoc:**
- Not detected. No JSDoc/TSDoc convention is established in `src/` or `tests/`.

## Function Design

**Size:** Keep small presentational components self-contained. Larger interactive components such as `src/components/AppShell.tsx` and `src/pages/Contact.tsx` group related effects, handlers, and JSX in one module rather than extracting premature helpers.

**Parameters:** Prefer object destructuring for component props (`src/components/Snackbar.tsx`, `src/components/BackgroundBands.tsx`) and inline children types for small providers (`src/contexts/ThemeContext.tsx`).

**Return Values:** React components return JSX directly. Hooks and utilities return typed values or objects; `useTheme` returns `ThemeContextType` from `src/contexts/ThemeContext.tsx`, and browser mock factories return objects with `vi.fn` methods in `tests/utils/browser-mocks.ts`.

## Module Design

**Exports:** Use default exports for pages and components (`src/pages/Contact.tsx`, `src/components/AppShell.tsx`) and named exports for hooks, providers, config, and test utilities (`src/contexts/ThemeContext.tsx`, `src/siteConfig.ts`, `tests/utils/test-utils.tsx`).

**Barrel Files:** Not used. Import files directly from their concrete module paths.

---

*Convention analysis: 2026-06-05*
