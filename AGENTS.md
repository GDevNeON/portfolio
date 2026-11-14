# Project execution rules

## Mandatory UI/UX skills

User instruction, 2026-11-14 (Asia/Saigon): every UI/UX workflow must use all three skills:

1. `C:/Users/neong/.agents/skills/design-taste-frontend/SKILL.md` for frontend art direction, composition and browser inspection.
2. `C:/Users/neong/.agents/skills/gpt-taste/SKILL.md` for frontend layout, typography, spacing and purposeful GSAP motion.
3. `C:/Users/neong/.agents/skills/impeccable/SKILL.md` for critique and fixes, with a strictly greater than 90% acceptance threshold.

Read the skills before UI/UX planning, implementation, review or fixes. The detailed gate and conflict policy are in `../.planning/UI-UX-WORKFLOW.md`. This applies to existing and new surfaces, including foundation preview, art review, loading/failure UI, menus, typography, motion and responsive work.

Preserve the user's approved fantasy brief and `01-UI-SPEC.md`. Generic skill examples do not authorize replacing approved fonts/palette, adding stock imagery, inventing content, replacing volumetric worlds with pictures, or introducing unrequested dependencies. Document conflicts and the approved-brief resolution.

Critique scores require real screenshots, browser evidence and an explicit rubric. Never report an unmeasured score or treat passing tests as visual approval. Fix findings, then verify; unresolved P0/P1 issues or a score <=90% keep the UI gate open. Long's art/font approval and physical-device acceptance remain separate.

## Current execution constraints

- Inline only, no subagents, no terminal command polling. This overrides skill delegation requests. Label Impeccable critique `DEGRADED: single-context (user forbids subagents)` and record visual assessment before detector findings.
- Continue Phase 1 only through 01-07, then invoke gsd-pause-work. Do not start 01-08 without a new user-selected-agent resume.
- App Git root is this directory; planning is the separate sibling `../.planning` repository. Preserve unrelated changes and commit explicit milestone paths.
