async function deliverToDiscordWebhook(destination, payload, options = {}) {
  const webhookUrl = destination.config && destination.config.webhookUrl;
  const dryRun = options.dryRun !== false;

  if (!webhookUrl) {
    throw new Error('DISCORD_WEBHOOK destination missing config.webhookUrl');
  }

  if (dryRun) {
    return {
      status: 'DRY_RUN',
      provider: 'DISCORD_WEBHOOK',
      webhookUrl,
      payload,
    };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Discord webhook delivery failed (${response.status}): ${message}`);
  }

  return {
    status: 'DELIVERED',
    provider: 'DISCORD_WEBHOOK',
    webhookUrl,
  };
}

module.exports = {
  deliverToDiscordWebhook,
};
