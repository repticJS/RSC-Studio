const { loadTemplateById } = require('./services/templateRegistry');
const { generateFromTemplate } = require('./services/templateService');
const { dispatchPayload } = require('./delivery/dispatchService');

async function runStudio({ templateId, inputData = {}, dispatchOptions = {}, templatesPath }) {
  const templateEnvelope = loadTemplateById(templateId, { templatesPath });
  const generated = generateFromTemplate(templateEnvelope, inputData);
  const deliveryResults = await dispatchPayload(
    generated.destinations,
    generated.payload,
    dispatchOptions
  );

  return { generated, deliveryResults };
}

async function demo() {
  const response = await runStudio({
    templateId: 'discord-incident-alert',
    inputData: {
      title: 'API Incident Update',
      description: 'Latency is elevated in us-east-1. Engineers are investigating.',
      color: 16753920,
      fields: [
        { name: 'Status', value: 'Investigating', inline: true },
        { name: 'Severity', value: 'High', inline: true },
      ],
      footer: {
        text: 'Studio Demo',
      },
      timestamp: new Date().toISOString(),
    },
    dispatchOptions: {
      dryRun: true,
    },
  });

  console.log(JSON.stringify(response, null, 2));
}

if (require.main === module) {
  demo().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = {
  runStudio,
};
