## The loop
This project uses AI Loop Kit. Pieces are GitHub issues with one `state:` label.
Only the gate (gate.py) changes a state label. The person merges every pull request.
Prepare command: `npm install`
Test command: `npm test`
Quality: `npx eslint --no-config-lookup --no-inline-config --ignore-pattern '.loop/**' --rule 'complexity: ["error", 20]' index.js`
Standards: `STANDARDS.md`
Protected paths: `package.json`, `.editorconfig`, `.npmrc`, `license`
