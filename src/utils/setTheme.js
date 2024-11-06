const setTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (!currentTheme) return;
    document.querySelector('html').setAttribute('data-theme', currentTheme);
  };
  
  export default setTheme;