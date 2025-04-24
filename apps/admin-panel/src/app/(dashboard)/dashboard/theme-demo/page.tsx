'use client';

import { ThemeDemo } from '@/components/ThemeDemo';
import { useEffect } from 'react';

export default function ThemeDemoPage() {
  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto py-8">
        <div className="glass-effect rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">Theme Demo</h1>
          <p className="text-muted-foreground">
            This page showcases all the custom utilities and animations available in the theme.
            Hover over elements and click buttons to see the effects in action.
            Toggle dark mode to see how the effects adapt to different themes.
          </p>
        </div>
        <ThemeDemo />
      </div>
    </div>
  );
} 