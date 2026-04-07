export const extractDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

export const extractDisplayDomain = (url) => {
  const domain = extractDomain(url);
  if (!domain) return null;
  return domain.replace(/^www\./, '');
};
