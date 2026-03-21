# test_fixture.tsx — Expected Review Findings

Load `agentic-jsdoc`, then ask: **"Review the JSDoc in tests/test_fixture.tsx"**

## Should Flag (7 violations)

1. **`StatusBadgeProps`** — Missing interface-level JSDoc summary and inline property descriptions
2. **`StatusBadge` `@param`** — Missing type and description (`@param props` alone is insufficient)
3. **`StatusBadge` `@returns`** — Missing return type (should be `{JSX.Element}`)
4. **`StatusBadge` `@see`** — Uses `{@link}` for file references (`StatusBadge.stories.tsx`, `StatusBadge.test.tsx`); should use Markdown-style links
5. **`StatusBadge`** — Missing `@example` and `@category`
6. **`useStatusColor` `@see`** — Uses `{@link}` for test file (`useStatusColor.test.ts`); should use Markdown-style link
7. **`statusSchema`** — Redundant `@typedef` duplicating the TypeScript `StatusPayload` type; and `@see` uses `{@link}` for test file (`statusSchema.test.ts`)

## Should NOT Flag (3 correct usages)

8. **`useStatusColor` `@see {@link StatusContext}`** — Correct; code symbol reference
9. **`StatusBadge` `@see {@link StatusBadgeProps}`** — Correct; code symbol reference
10. **`StatusPayload` `@see {@link statusSchema}`** — Correct; code symbol reference
