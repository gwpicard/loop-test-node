# Coding standards

These rules match how the project works today.

- Use ES modules. Do not use CommonJS.
- Target Node 22 or newer.
- Add no runtime dependencies. This package has none.
- Indent with tabs, as `.editorconfig` says.
- Pass `xo` with no new warnings. `npm test` runs it.
- Keep each function at complexity 20 or lower. Aim for 10 in new code.
- Keep the public API in `index.js` and its types in `index.d.ts` in step.
- Add a type test in `index.test-d.ts` for each API change.
- Add a test for each behavior change. Name the behavior in the test title.
- Write comments only to explain why. Do not describe what the code does.
