export const extractDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const extractDisplayDomain = (url) => {
  return extractDomain(url).replace(/^www\./, '');
};
