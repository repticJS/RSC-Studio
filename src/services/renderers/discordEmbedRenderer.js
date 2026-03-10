function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override ?? base;
  }

  if (typeof base !== 'object' || base === null) {
    return override ?? base;
  }

  if (typeof override !== 'object' || override === null) {
    return override ?? base;
  }

  const merged = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (key in merged) {
      merged[key] = deepMerge(merged[key], value);
      continue;
    }

    merged[key] = value;
  }

  return merged;
}

function renderDiscordEmbed(baseData, inputData) {
  const mergedData = deepMerge(baseData, inputData);

  const embed = {
    title: mergedData.title,
    description: mergedData.description,
    url: mergedData.url,
    color: mergedData.color,
    timestamp: mergedData.timestamp,
    footer: mergedData.footer,
    image: mergedData.image,
    thumbnail: mergedData.thumbnail,
    author: mergedData.author,
    fields: mergedData.fields,
  };

  return {
    content: mergedData.content,
    embeds: [embed],
  };
}

module.exports = {
  renderDiscordEmbed,
};
