import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './colors';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme = {
    isDark,
    colors: {
      // Brand colors
      primary: colors.brand.primary,
      secondary: colors.brand.secondary,
      accent: colors.brand.accent,
      ...colors.brand.palette,
      // Theme-specific colors
      ...(isDark ? colors.dark : colors.light),
    },
    // Typography scale - elegant and clean
    typography: {
      h1: {
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 40,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: 28,
        fontWeight: '600',
        lineHeight: 36,
        letterSpacing: -0.3,
      },
      h3: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
        letterSpacing: -0.2,
      },
      h4: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
      },
      h5: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 24,
      },
      body1: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
      },
      body2: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
      },
      caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
      },
      button: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.5,
      },
    },
    // Spacing scale
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
      xxxl: 64,
    },
    // Border radius scale - more elegant
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
      full: 9999,
    },
    // Shadow styles - subtle and elegant
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.3 : 0.04,
        shadowRadius: 3,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.4 : 0.08,
        shadowRadius: 6,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.5 : 0.12,
        shadowRadius: 12,
        elevation: 8,
      },
    },
    // Animation durations
    animation: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 