'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
