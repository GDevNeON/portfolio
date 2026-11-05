# Testing Patterns

**Analysis Date:** 2026-06-05

## Test Framework

**Runner:**
- Vitest 4.1.5
- Config: `vite.config.ts`
- Environment: `jsdom`
- Globals: enabled through `test.globals: true` in `vite.config.ts`
- Setup file: `tests/setup.ts`
- Include pattern: `tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`

**Assertion Library:**
- Vitest `expect`
- `@testing-library/jest-dom/vitest` loaded globally from `tests/setup.ts`
- React Testing Library from `@testing-library/react`

**Run Commands:**
```bash
npm run test      # Run Vitest in watch mode
npm run test:run  # Run all tests once
npm run test:ui   # Run Vitest UI
```

## Test File Organization

**Location:**
- Tests are kept outside `src/` under `tests/`.
- Page tests live in `tests/pages/`: `tests/pages/Contact.test.tsx`, `tests/pages/smoke.test.tsx`.
- Context tests live in `tests/contexts/`: `tests/contexts/ThemeContext.test.tsx`.
- Shared helpers live in `tests/utils/`: `tests/utils/test-utils.tsx`, `tests/utils/browser-mocks.ts`.
- Shared mocks live in `tests/mocks/`: `tests/mocks/emailjs.ts`.

**Naming:**
- Use `[Subject].test.tsx` for feature-level tests: `Contact.test.tsx`, `ThemeContext.test.tsx`.
- Use descriptive cross-page names for broad coverage: `smoke.test.tsx`.

**Structure:**
```text
tests/
├── setup.ts
├── contexts/
│   └── ThemeContext.test.tsx
├── mocks/
│   └── emailjs.ts
├── pages/
│   ├── Contact.test.tsx
│   └── smoke.test.tsx
└── utils/
    ├── browser-mocks.ts
    └── test-utils.tsx
```

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../utils/test-utils'
import Contact from '../../src/pages/Contact'

describe('Contact Page', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test_service_id')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test_template_id')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'test_public_key')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows error for invalid email format', async () => {
    render(<Contact />)

    fireEvent.change(screen.getByPlaceholderText(/nq2019/i), {
      target: { value: 'invalid-email' },
    })

    screen.getByRole('button', { name: /Send message/i }).click()

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Invalid Email/i)
    })
  })
})
```

**Patterns:**
- Group tests by user-facing unit with `describe`, then name cases by expected behavior: `tests/pages/Contact.test.tsx`, `tests/contexts/ThemeContext.test.tsx`.
- Use `beforeEach` for fresh browser mocks and environment setup, and `afterEach` for `vi.unstubAllGlobals()` cleanup.
- Prefer accessible queries such as `getByRole`, `getByText`, and `getByPlaceholderText` over DOM selectors.
- Use `waitFor` for asynchronous state updates after interactions, EmailJS calls, and theme toggles.
- Use `renderHook` for hook-specific behavior when a component render is not the right assertion surface, as in `tests/contexts/ThemeContext.test.tsx`.

## Mocking

**Framework:** Vitest `vi`

**Patterns:**
```typescript
// tests/setup.ts
vi.mock('@emailjs/browser', () => ({
  default: mockEmailJS,
}))

beforeEach(() => {
  mockEmailJS._reset()
})
```

```typescript
// tests/pages/Contact.test.tsx
vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test_service_id')
vi.stubGlobal('localStorage', createMockLocalStorage())
mockEmailJS.send.mockRejectedValue(new Error('Send failed'))
```

**What to Mock:**
- Mock external services globally in `tests/setup.ts`. EmailJS is mocked through `tests/mocks/emailjs.ts`.
- Mock browser storage with `createMockLocalStorage` from `tests/utils/browser-mocks.ts`.
- Mock unavailable browser APIs such as `IntersectionObserver` and `window.scrollTo` in page smoke tests (`tests/pages/smoke.test.tsx`).
- Stub Vite environment variables with `vi.stubEnv` in tests that exercise environment-dependent code (`tests/pages/Contact.test.tsx`).

**What NOT to Mock:**
- Do not mock React Router for normal component behavior; render with providers from `tests/utils/test-utils.tsx` or `MemoryRouter` from `tests/pages/smoke.test.tsx`.
- Do not mock `ThemeProvider` when testing user-facing components that depend on app providers; use the shared `render` helper from `tests/utils/test-utils.tsx`.
- Do not mock internal validation logic in `src/pages/Contact.tsx`; exercise it through form inputs and visible snackbar output.

## Fixtures and Factories

**Test Data:**
```typescript
// tests/utils/browser-mocks.ts
export function createMockLocalStorage() {
  const store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(k => delete store[k])
    }),
    _store: store,
  }
}
```

```typescript
// tests/mocks/emailjs.ts
export const mockEmailJS = {
  send: vi.fn(),
  _reset: () => {
    mockEmailJS.send.mockClear()
    mockEmailJS.send.mockResolvedValue({ status: 200, text: 'OK' })
  },
}
```

**Location:**
- Browser API factories belong in `tests/utils/browser-mocks.ts`.
- Render/provider helpers belong in `tests/utils/test-utils.tsx`.
- External SDK mocks belong in `tests/mocks/`.
- Inline test fixtures are acceptable for small state setup, such as preloading rate-limit JSON into mock storage in `tests/pages/Contact.test.tsx`.

## Coverage

**Requirements:** None enforced. No coverage script or threshold is configured in `package.json` or `vite.config.ts`.

**View Coverage:**
```bash
# Not configured. Add a Vitest coverage provider before relying on this command.
vitest run --coverage
```

## Test Types

**Unit Tests:**
- Context and hook behavior is tested in `tests/contexts/ThemeContext.test.tsx`.
- Mock factory behavior is indirectly exercised by tests that stub `localStorage` and EmailJS.

**Integration Tests:**
- Page-level form behavior is covered in `tests/pages/Contact.test.tsx`, including validation, environment checks, rate limiting, successful send behavior, EmailJS parameter assertions, and failure handling.
- Smoke-level rendering for core routes is covered in `tests/pages/smoke.test.tsx`.

**E2E Tests:**
- Not used. No Playwright, Cypress, or browser E2E config is detected.

## Common Patterns

**Async Testing:**
```typescript
screen.getByRole('button', { name: /Send message/i }).click()

await waitFor(() => {
  expect(screen.getByRole('status')).toHaveTextContent(/Sent successfully/i)
})
```

**Error Testing:**
```typescript
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

expect(() => {
  renderHook(() => useTheme())
}).toThrow('useTheme must be used within a ThemeProvider')

consoleSpy.mockRestore()
```

**Provider Rendering:**
```typescript
// tests/utils/test-utils.tsx
function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  )
}

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}
```

---

*Testing analysis: 2026-06-05*
