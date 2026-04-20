export const THEME_STORAGE_KEY = "theme";

export const themeScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);return;}var m=window.matchMedia('(prefers-color-scheme: dark)');d.setAttribute('data-theme',m.matches?'dark':'light');}catch(e){}})();`;
