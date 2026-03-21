# test_fixture_write.tsx — Expected Write Findings

Load `agentic-jsdoc`, then ask: **"Write JSDoc for every export in this file."**

## What to verify in the output

### AlertBannerProps interface
- [ ] Has a JSDoc summary line
- [ ] Each property has an inline `/** */` description

### AlertBanner component
- [ ] Summary line describing what it renders
- [ ] `@param {AlertBannerProps} props - ...` with description
- [ ] `@returns {JSX.Element}`
- [ ] `@see {@link AlertBannerProps}` — code symbol, uses `{@link}`
- [ ] `@see` Markdown-style links for stories/tests if the agent searched and found them (or omitted if not found)
- [ ] `@category Components`
- [ ] `@example` with output comment

### NotificationContextValue interface
- [ ] Has a JSDoc summary line
- [ ] Each property has an inline `/** */` description

### NotificationContext
- [ ] Has a JSDoc summary line
- [ ] `@default` documents the default value

### useNotifications hook
- [ ] Summary line
- [ ] `@returns {NotificationContextValue}` with description
- [ ] `@see {@link NotificationContext}` — code symbol, uses `{@link}`
- [ ] `@category Hooks`
- [ ] `@example` with output comment

### alertPayloadSchema
- [ ] Summary line
- [ ] `@see {@link AlertPayload}` — code symbol, uses `{@link}`
- [ ] No redundant `@typedef` (TypeScript type already exists)

### AlertPayload type
- [ ] Summary line
- [ ] `@see {@link alertPayloadSchema}` — code symbol, uses `{@link}`

### truncateMessage utility
- [ ] Summary line and description
- [ ] `@param {string} message - ...` with description
- [ ] `@param {number} maxLength - ...` with description
- [ ] `@returns {string}` with description
- [ ] `@category Utilities`
- [ ] `@example` with output comment (e.g., `// returns "Hello…"`)

### useDocumentTitle hook
- [ ] Summary line
- [ ] `@param {string} title - ...` with description
- [ ] `@returns {void} Side-effects only.`
- [ ] `@category Hooks`
- [ ] `@example` with output comment
