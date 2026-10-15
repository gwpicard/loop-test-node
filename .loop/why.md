The `isPascalCase` helper existed, but the README did not describe it and the type tests did not cover it. This change adds a README section after `isCamelCase` and type tests in the style of the `isCamelCase` tests. The judge pins the edge cases.

The judge checks the README by key words, so a later rewording could break it. The type tests are only read as text by the judge. The `npm test` type check is the real guard for them.
