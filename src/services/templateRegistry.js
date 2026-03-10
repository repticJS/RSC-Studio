const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_TEMPLATES_PATH = path.join(process.cwd(), 'templates');

function validateTemplateEnvelope(templateEnvelope) {
  if (!templateEnvelope || typeof templateEnvelope !== 'object') {
    throw new Error('Template must be a JSON object.');
  }

  if (!templateEnvelope.template || !templateEnvelope.template.type) {
    throw new Error('Template is missing template.type.');
  }

  if (!templateEnvelope.delivery || !Array.isArray(templateEnvelope.delivery.destinations)) {
    throw new Error('Template is missing delivery.destinations array.');
  }

  if (!templateEnvelope.data || typeof templateEnvelope.data !== 'object') {
    throw new Error('Template is missing data object.');
  }
}

function loadTemplateById(templateId, options = {}) {
  const templatesPath = options.templatesPath || DEFAULT_TEMPLATES_PATH;
  const filePath = path.join(templatesPath, `${templateId}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template not found for id: ${templateId}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const templateEnvelope = JSON.parse(fileContent);

  validateTemplateEnvelope(templateEnvelope);
  return templateEnvelope;
}

module.exports = {
  loadTemplateById,
  validateTemplateEnvelope,
};
