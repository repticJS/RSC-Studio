const { deliverToDiscordWebhook } = require('./providers/discordWebhookDelivery');

const DELIVERY_PROVIDERS = {
  DISCORD_WEBHOOK: deliverToDiscordWebhook,
};

async function dispatchPayload(destinations, payload, options = {}) {
  const results = [];

  for (const destination of destinations) {
    const provider = DELIVERY_PROVIDERS[destination.type];

    if (!provider) {
      results.push({
        status: 'SKIPPED',
        reason: `No delivery provider found for type: ${destination.type}`,
        destinationType: destination.type,
      });
      continue;
    }

    const mergedPayload = {
      ...payload,
      ...(destination.data || {}),
    };

    results.push(await provider(destination, mergedPayload, options));
  }

  return results;
}

module.exports = {
  DELIVERY_PROVIDERS,
  dispatchPayload,
};
