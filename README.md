# Studio

Studio is a small JavaScript engine that:

1. Loads a template by `templateId`.
2. Merges runtime data into template defaults.
3. Renders output based on template type.
4. Dispatches output to one or many delivery destinations.

## Folder structure

- `src/services`: template loading + rendering.
- `src/delivery`: provider implementations + dispatch logic.
- `templates`: JSON templates (`<templateId>.json`).

## Why this is simpler

- Uses plain functions instead of classes.
- Keeps template rendering and delivery concerns separate.
- Uses two maps to extend behavior:
  - `RENDERERS` in `src/services/templateService.js`
  - `DELIVERY_PROVIDERS` in `src/delivery/dispatchService.js`

## Quick start

```bash
npm install
npm run demo
```

## Use in code

```js
const { runStudio } = require('./src/index');

runStudio({
  templateId: 'discord-incident-alert',
  inputData: {
    title: 'Service Update',
    description: 'Everything is stable.',
  },
  dispatchOptions: { dryRun: true },
});
```
