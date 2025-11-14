export const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const validateTheme = (theme) => {
  return theme === 'light' || theme === 'dark' ? theme : 'light';
};

export const applyThemeClass = (theme) => {
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${theme}-theme`);
};

