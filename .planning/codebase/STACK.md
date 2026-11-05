# Technology Stack

**Analysis Date:** 2026-06-05

## Languages

**Primary:**
- TypeScript 5.9.3 - Application code in `src/**/*.ts`, `src/**/*.tsx`, test code in `tests/**/*.ts`, and Vite config in `vite.config.ts`.
- TSX / React JSX - React components in `src/App.tsx`, `src/main.tsx`, `src/pages/Contact.tsx`, `src/pages/Home.tsx`, and `src/components/*.tsx`.

**Secondary:**
- CSS - Custom styling in `src/App.css`, `src/index.css`, and `src/styles/*.css`; no CSS framework is configured.
- HTML - Vite document shell in `index.html`.
- JavaScript ESM - ESLint flat config in `eslint.config.js`.

## Runtime

**Environment:**
- Browser runtime - Client-side React app mounted from `src/main.tsx`; external browser APIs include `localStorage` in `src/contexts/ThemeContext.tsx` and `src/pages/Contact.tsx`.
- Node.js version: Not pinned. No `.nvmrc`, `.node-version`, or `engines.node` entry is detected in `package.json`.

**Package Manager:**
- npm - `package-lock.json` is present with lockfile version 3.
- Lockfile: present at `package-lock.json`.

## Frameworks

**Core:**
- React 19.2.0 - UI rendering and component model; entry point is `src/main.tsx`.
- React DOM 19.2.0 - Browser root rendering through `createRoot` in `src/main.tsx`.
- React Router DOM 6.30.1 - Browser routing through `BrowserRouter`, `Routes`, and `Route` in `src/App.tsx`; route-aware shell behavior in `src/components/AppShell.tsx`.
- Vite 7.2.4 - Development server and production bundler configured in `vite.config.ts`.

**Testing:**
- Vitest 4.1.5 - Test runner configured in `vite.config.ts`; commands are defined in `package.json`.
- jsdom 29.1.1 - Browser-like test environment configured in `vite.config.ts`.
- Testing Library React 16.3.2 - Component testing utilities used from `tests/utils/test-utils.tsx`.
- Testing Library jest-dom 6.9.1 - DOM matchers loaded in `tests/setup.ts`.
- Testing Library user-event 14.6.1 - Installed for user interaction tests in `package.json`.

**Build/Dev:**
- TypeScript project references - Root config `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`.
- @vitejs/plugin-react 5.1.1 - React transform plugin imported in `vite.config.ts`.
- ESLint 9.39.1 - Flat config in `eslint.config.js`.
- typescript-eslint 8.46.4 - TypeScript lint presets configured in `eslint.config.js`.
- eslint-plugin-react-hooks 7.0.1 - React Hooks linting configured in `eslint.config.js`.
- eslint-plugin-react-refresh 0.4.24 - Vite React Refresh linting configured in `eslint.config.js`.

## Key Dependencies

**Critical:**
- `@emailjs/browser` 4.4.1 - Sends contact form emails directly from the browser in `src/pages/Contact.tsx`.
- `react` 19.2.0 - Required by all React components in `src/**/*.tsx`.
- `react-dom` 19.2.0 - Mounts the app in `src/main.tsx`.
- `react-router-dom` 6.30.1 - Owns client-side navigation in `src/App.tsx` and `src/components/AppShell.tsx`.

**Infrastructure:**
- `vite` 7.2.4 - Build, dev server, preview server, and Vitest-compatible config in `vite.config.ts`.
- `typescript` 5.9.3 - Type checking through `npm run build` and strict compiler settings in `tsconfig.app.json`.
- `vitest` 4.1.5 - Unit/component test runner.
- `jsdom` 29.1.1 - DOM runtime for tests.
- `@react-three/fiber` 9.6.1 - Installed in `package.json`; no active import detected in `src/` or `tests/`.
- `@react-three/drei` 10.7.7 - Installed in `package.json`; no active import detected in `src/` or `tests/`.
- `three` 0.184.0 - Installed in `package.json`; no active import detected in `src/` or `tests/`.
- `@types/three` 0.184.1 - Installed in `package.json`; supports Three.js typing if Three.js code is added.

## Configuration

**Environment:**
- Vite environment variables are read through `import.meta.env` in `src/pages/Contact.tsx`.
- Required EmailJS variables are documented in `README.md` and represented by `.env.example`: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
- `.env.local` is present and must not be read or committed with secrets.
- `.env.example` is present as non-secret environment documentation.

**Build:**
- `vite.config.ts` configures React plugin and Vitest.
- `tsconfig.json` configures TypeScript project references.
- `tsconfig.app.json` configures browser app compilation with `target: ES2022`, `moduleResolution: bundler`, `jsx: react-jsx`, `strict: true`, `noUnusedLocals: true`, and `noUnusedParameters: true`.
- `tsconfig.node.json` configures Node-side TypeScript for config tooling.
- `eslint.config.js` configures ESLint flat config for `**/*.{ts,tsx}` and ignores `dist`.
- `package.json` scripts:
  - `npm run dev` starts Vite.
  - `npm run build` runs `tsc -b && vite build`.
  - `npm run lint` runs ESLint.
  - `npm run preview` runs Vite preview.
  - `npm run test`, `npm run test:ui`, and `npm run test:run` run Vitest.

## Platform Requirements

**Development:**
- Use npm with `package-lock.json`; install with `npm install`.
- Use a modern Node.js version compatible with Vite 7 and TypeScript 5.9; no repo-pinned Node version is detected.
- Use browser APIs in development and tests through jsdom; tests set up browser mocks in `tests/setup.ts` and `tests/utils/browser-mocks.ts`.

**Production:**
- Static frontend build output is generated by Vite into `dist/`.
- Hosting platform is not configured in repo files; no `.github/workflows`, Netlify config, Vercel config, or deployment manifest is detected.
- Runtime backend is not present; contact emails are delegated to EmailJS from `src/pages/Contact.tsx`.

---

*Stack analysis: 2026-06-05*
