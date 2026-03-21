# JSDoc LLM Parsing Standard

An Agent Skill designed to maximize Large Language Model (LLM) comprehension for code generation, documentation, and RAG (Retrieval-Augmented Generation) retrieval.

When an LLM agent creates or reads code without an enforced standard, it misses critical architecture links and struggles with React edge cases. This skill explicitly guides the agent to document React context hooks, Zustand stores, Suspense boundaries, and explicit routing.

## The Standard ([SKILL.md](./SKILL.md))

The core of this project is [SKILL.md](./SKILL.md). It serves as the **source of truth** for your AI agent to understand:
- **Priority Tags**: Strict usage of `@param`, `@returns`, `@throws`, `@category`, and `@example` for RAG clarity.
- **Hierarchical Structure**: A deterministic block order (Summary → Description → Tags → Example) to ensure consistent LLM parsing.
- **Architecture Primitives**: Specialized JSDoc patterns for React Components, Custom Hooks, Zustand Stores, and Zod Schemas.
- **Review Criteria**: A built-in checklist for agents to audit and refactor existing documentation.

Your agent will automatically ingest `SKILL.md` when installed as a skill, providing persistent grounding for all documentation tasks.

## Installation

Install this skill automatically into your project using the `skills` CLI:

```bash
npx skills add jbelew/agentic-jsdoc
```

Alternatively, you can add it to your local environment manually by cloning it into your skills directory:

```bash
mkdir -p .agents/skills
git clone https://github.com/jbelew/agentic-jsdoc.git .agents/skills/agentic-jsdoc
```

## Linting Enforcement

To ensure your team naturally adheres to this standard before an LLM even touches the codebase, use these strict `eslint-plugin-jsdoc` rules.

Add this to your ESLint configuration (`eslint.config.js`):

```javascript
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,ts,tsx}"],
    plugins: { jsdoc },
    settings: {
      jsdoc: {
        mode: "typescript",
      },
    },
    rules: {
      // Force JSDoc on functions, classes, and crucially: TypeScript Interfaces (for React Props)
      "jsdoc/require-jsdoc": ["warn", {
        require: { FunctionDeclaration: true, MethodDefinition: true, ClassDeclaration: true },
        contexts: ["TSInterfaceDeclaration", "TSTypeAliasDeclaration"],
      }],
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-example": "warn",
      "jsdoc/check-tag-names": "error",
    },
  },
]);
```

## Strict TypeDoc Generation

Because this standard forces heavy adherence to rich metadata tags and explicit linking, the codebase becomes fully compatible with automatic wiki generators natively. You can drop in `typedoc` and it will read these heavily structured comments flawlessly!

```bash
npm install -D typedoc
npx typedoc --entryPoints src/index.ts --out docs
```

## Examples Directory

This skill ships with an `examples/` directory that provides exact 1-to-1 examples of how architecture elements should be fully documented for maximum agent comprehension. The agent can use these files as grounding truth.
