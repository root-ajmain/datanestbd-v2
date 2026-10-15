'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { MotionConfig } from 'motion/react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const fallbackPreferences = new Map<string, string>();

function readPreference(key: string): string | null {
  if (fallbackPreferences.has(key)) return fallbackPreferences.get(key)!;
  try { return localStorage.getItem(key); }
  catch { return null; }
}

function writePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    fallbackPreferences.delete(key);
  } catch { fallbackPreferences.set(key, value); }
  window.dispatchEvent(new Event('datanest-preferences'));
}

function subscribe(callback: () => void) {
  const color = window.matchMedia('(prefers-color-scheme: dark)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('storage', callback);
  window.addEventListener('datanest-preferences', callback);
  color.addEventListener('change', callback);
  motion.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('datanest-preferences', callback);
    color.removeEventListener('change', callback);
    motion.removeEventListener('change', callback);
  };
}

function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const val = readPreference('datanest-theme');
  return val === 'light' || val === 'dark' || val === 'system' ? val : 'system';
}

function getStoredMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = readPreference('datanest-reduced-motion');
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const getSystemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
const setTheme = (mode: ThemeMode) => writePreference('datanest-theme', mode);
const setReduceMotion = (reduce: boolean) => writePreference('datanest-reduced-motion', String(reduce));

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getStoredTheme, () => 'system' as ThemeMode);
  const reduceMotion = useSyncExternalStore(subscribe, getStoredMotion, () => true);
  const systemDark = useSyncExternalStore(subscribe, getSystemDark, () => false);
  void theme;
  void systemDark;
  // The redesigned marketing site has one deliberate dark palette. Keep the
  // dark variant active because marketing pages use it for readable text and
  // controls over the near-black canvas.
  const resolvedTheme = 'dark' as const;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.dataset.theme = resolvedTheme;
    root.classList.toggle('reduced-motion', reduceMotion);
  }, [resolvedTheme, reduceMotion]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, reduceMotion, setReduceMotion }}>
      <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
