const { renderDiscordEmbed } = require('./renderers/discordEmbedRenderer');

const RENDERERS = {
  DISCORD_EMBED: renderDiscordEmbed,
};

function generateFromTemplate(templateEnvelope, inputData = {}) {
  const templateType = templateEnvelope.template.type;
  const renderer = RENDERERS[templateType];

  if (!renderer) {
    throw new Error(`No renderer found for template type: ${templateType}`);
  }

  return {
    templateId: templateEnvelope.template.id,
    templateType,
    payload: renderer(templateEnvelope.data, inputData),
    destinations: templateEnvelope.delivery.destinations,
  };
}

module.exports = {
  RENDERERS,
  generateFromTemplate,
};
