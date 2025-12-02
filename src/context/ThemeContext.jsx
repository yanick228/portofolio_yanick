import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Vérifier si la classe dark existe déjà sur le document (initialisée par le script inline)
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Appliquer le thème immédiatement
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Sauvegarder le thème
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [theme]);

  // Écouter les changements de préférence système si aucun thème n'est sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return; // Ne pas écouter si un thème est déjà sauvegardé

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Vérifier une fois au montage
    if (mediaQuery.matches !== (theme === 'dark')) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    // Ajouter l'écouteur pour les changements futurs
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Support pour les anciens navigateurs
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

