---
name: agentic-jsdoc
description: "Writes and reviews JSDoc optimized for LLM parsing. Use when writing new code, adding documentation, or reviewing existing JSDoc for LLM-friendly structure, type clarity, and semantic richness."
---

# JSDoc Standards for LLM Parsing

Enforce JSDoc conventions that maximize LLM comprehension for code generation, documentation, and RAG retrieval.

## Core Principles

1. **TypeScript-flavor JSDoc** — even in plain JS files
2. **Hierarchical structure** — Summary → Description → Tags → Example
3. **Semantic richness** — every tag carries a description, not just a type
4. **Markdown formatting** — use markdown backticks for `variables`, `types`, and `functionNames` within descriptions to improve entity extraction.

## When Writing Code

Apply these rules to every exported function, class, method, React component, custom hook, and type:

### 1. Use TypeScript-Compatible JSDoc Syntax

- Use `@type`, `@typedef`, and `@param {type}` strictly.
- Define complex object shapes with `@typedef {Object}` so LLMs know explicit data structures, or document the TypeScript `interface`/`type` directly.
- Prefer union types (`{string|null}`) over vague types (`{*}`, `{any}`).
- Use `@template` for generic type parameters to maintain strong typing awareness.

### 2. Follow the Hierarchical Block Structure

Every JSDoc block must follow this order:

```
1. Summary       — One-sentence purpose (the "What")
2. Description   — Context, rationale, constraints (the "Why"), separated by a blank line
3. @typedef      — Inline type definitions, if needed
4. @template     — Generic type declarations
5. @param        — All parameters: {type} name - Description
6. @returns      — Explicit return shape (e.g., for Promises and Custom Hooks)
7. @throws       — Documented errors for better try/catch generation
8. @deprecated   — If deprecated, explicitly state *what to use instead*
9. @see          — Links to related functions, components, schemas, or files
10. @example     — Working usage example (most important for correct LLM usage)
```

### 3. Tag Rules & Context

- **`@param`**: Always include a description after the type — `{type} name - Description`. 
- **`@returns`**: Be explicit about the return shape. For Promises, specify the resolved type: `{Promise<User[]>}`. For custom hooks returning `void`, explicitly state `@returns {void} Side-effects only.`
- **`@throws`**: Document every thrown error. This directly improves LLM-generated error handling.
- **`@deprecated`**: Never just use `@deprecated`. Always follow with "Use `OtherFunction` instead."
- **`@see`**: Aggressively use `@see` to link dependencies. E.g., a Context hook should `@see MyContext`, and an API fetcher should `@see` standard error handlers it triggers.
- **`@example`**: Required for any non-trivial function. Must include expected output as comments (e.g., `// returns "value"` or `// mounts Component`).

### 4. Special Contexts: Architecture Primitives

**React Components**
For React elements, LLMs heavily rely on the **Props Interface** rather than the component function itself. 
1. Document every property in the `interface` using JSDoc.
2. In the component JSDoc, do not re-document destructured props. Just refer to the Props interface.
3. **Tests & Stories**: Always use `@see MyComponent.test.tsx` or `@see MyComponent.stories.tsx` in the component JSDoc. This pulls in test coverage and visual variants automatically.
4. Include an `@example` of how to render the component.
5. **Suspense & Errors**: If the component throws errors defensively or suspends, note this explicitly in the description (e.g., "Requires an `<ErrorBoundary>` parent element").

**React Router (Route Components)**
When a component is a top-level route/page, document the expected URL parameters natively fetched via `useParams()` or `useSearchParams()`. Since they won't appear in the `Props` interface, list them out in the Description or using `@param` with `[URL]` notation (e.g., `@param {string} [URL/projectId] - The active project ID mapped by the router`). 

**Validation Schemas (Zod/Yup)**
Whenever documenting a TypeScript interface strictly paired with a Zod schema or Yup runtime validation, you MUST include `@see MySchema` on both the interface and the schema object to keep LLMs aligned between compile-time and runtime validation.

**Data Fetching (React Query / SWR)**
When creating abstract fetching hooks (e.g. `useUserQuery`), strictly define the cache invalidation keys or unique identifiers managed by the hook in a dedicated bullet point inside the description so LLMs know exactly what tokens invalidate the data natively.

**Zustand Stores**
When documenting a generated `useStore` hook from Zustand, ensure the `@returns` explicitly reflects the hook nature (e.g., `@returns {import("zustand").UseBoundStore...}`) and must strictly `@see` the State interface above it.

**React Context Hooks**
When exporting a custom hook like `useMyContext`, strictly `@see MyContext` so RAG engines can map the usage to the provider definition.

### 5. Documentation Engine Compatibility (TypeDoc)

To natively support enterprise documentation pipelines (like TypeDoc or JSDoc-to-Markdown generators), append categorization tags to top-level architecture modules:
- Use `@category Hooks`, `@category Components`, or `@category Utilities` prominently on public exports to group outputs visually.

## When Reviewing Code

Check every JSDoc block against these criteria:

1. **Summary present?** — First line must be a concise one-sentence description.
2. **Description present?** — Non-trivial functions need a "why" paragraph after a blank line, using markdown backticks for code references.
3. **TypeScript-flavor types?** — No `{*}` or `{any}`. Object shapes use `@typedef` or TypeScript types.
4. **All `@param` tags have descriptions?** — `{type} name` alone is insufficient.
5. **React/Store Types Documented?** — If it's a component or store, are the interfaces explicitly documented?
6. **`@returns` is explicit?** — Especially for Promises, custom hooks, and complex objects. Side-effect hooks must say `{void}`.
7. **`@throws` documented?** — Any function that can throw must document it. Ensure `<Suspense>` paths are caught.
8. **Deprecations are actionable?** — Check if `@deprecated` explains the migration path.
9. **RAG Linkage?** — Are tests, schemas, and contexts explicitly linked using `@see`?
10. **`@example` included?** — Required for exported/public functions. Must explicitly trace output via `// returns X`.

Flag violations and provide corrected JSDoc inline.
