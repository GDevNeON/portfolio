# Graph Report - neon-portfolio  (2026-06-05)

## Corpus Check
- 44 files · ~268,238 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 307 nodes · 315 edges · 26 communities (22 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `898496ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `Architecture` - 12 edges
4. `Codebase Concerns` - 10 edges
5. `Coding Conventions` - 9 edges
6. `Testing Patterns` - 9 edges
7. `scripts` - 8 edges
8. `Neon Portfolio Modernization` - 8 edges
9. `External Integrations` - 8 edges
10. `useTheme()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ThemeReader()` --calls--> `useTheme()`  [EXTRACTED]
  tests/contexts/ThemeContext.test.tsx → src/contexts/ThemeContext.tsx
- `ThemeToggler()` --calls--> `useTheme()`  [EXTRACTED]
  tests/contexts/ThemeContext.test.tsx → src/contexts/ThemeContext.tsx
- `BadComponent()` --calls--> `useTheme()`  [EXTRACTED]
  tests/contexts/ThemeContext.test.tsx → src/contexts/ThemeContext.tsx
- `ThemeToggle()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/ThemeToggle.tsx → src/contexts/ThemeContext.tsx

## Communities (26 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (22): ThemeToggle(), BadComponent(), consoleSpy, documentSpy, { result }, ThemeReader(), ThemeToggler(), Theme (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (8): PANEL_POSITIONS, GlassStackProps, GlassStackVerticalProps, SnackbarProps, mockIntersectionObserver, Project, ProjectKind, siteConfig

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (21): Adding New Route UI Inside `AppShell`, Anti-Patterns, Architectural Constraints, Architecture, code:text (┌───────────────────────────────────────────────────────────), Component Responsibilities, Contact Submission Flow, Cross-Cutting Concerns (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): dependencies, @emailjs/browser, react, react-dom, react-router-dom, @react-three/drei, @react-three/fiber, three (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): code:bash (npm run test      # Run Vitest in watch mode), code:typescript (const consoleSpy = vi.spyOn(console, 'error').mockImplementa), code:typescript (// tests/utils/test-utils.tsx), code:text (tests/), code:typescript (import { describe, it, expect, vi, beforeEach, afterEach } f), code:typescript (// tests/setup.ts), code:typescript (// tests/pages/Contact.test.tsx), code:typescript (// tests/utils/browser-mocks.ts) (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jsdom, @testing-library/jest-dom (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (15): Active, Constraints, Context, Core Value, Current Codebase, Current Risks To Address, Evolution, Key Decisions (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (13): code:bash (npm install), code:bash (npm run build), code:env (VITE_EMAILJS_SERVICE_ID=your_service_id), EmailJS Setup, Features, Getting Started, Getting Your Credentials, License (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.18
Nodes (10): Codebase Concerns, Dependencies at Risk, Fragile Areas, Known Bugs, Missing Critical Features, Performance Bottlenecks, Scaling Limits, Security Considerations (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (9): Code Style, Coding Conventions, Comments, Error Handling, Function Design, Import Organization, Logging, Module Design (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.22
Nodes (8): APIs & External Services, Authentication & Identity, CI/CD & Deployment, Data Storage, Environment Configuration, External Integrations, Monitoring & Observability, Webhooks & Callbacks

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (8): Codebase Structure, code:text (neon-portfolio/), Directory Layout, Directory Purposes, Key File Locations, Naming Conventions, Special Directories, Where to Add New Code

### Community 14 - "Community 14"
Cohesion: 0.25
Nodes (7): Configuration, Frameworks, Key Dependencies, Languages, Platform Requirements, Runtime, Technology Stack

### Community 15 - "Community 15"
Cohesion: 0.25
Nodes (6): 1. Think Before Coding, 2. Simplicity First, 3. Surgical Changes, 4. Goal-Driven Execution, code:block1 (1. [Step] → verify: [check]), graphify

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (3): ErrorBoundary, Props, State

### Community 17 - "Community 17"
Cohesion: 0.40
Nodes (3): EdgeRunnerTarget, shortestWrapDelta(), wrap01()

## Knowledge Gaps
- **191 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 7` to `Community 3`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _191 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08739495798319327 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._