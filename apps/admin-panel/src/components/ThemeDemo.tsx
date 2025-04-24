'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun } from 'lucide-react';

export function ThemeDemo() {
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="hover-rotate"
        >
          {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>

      {/* Glass Effect Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Glass Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Light Glass</CardTitle>
              <CardDescription>With backdrop blur effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card uses the glass-effect utility with a light background.</p>
            </CardContent>
          </Card>
          <Card className="glass-effect-dark">
            <CardHeader>
              <CardTitle>Dark Glass</CardTitle>
              <CardDescription>With backdrop blur effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card uses the glass-effect-dark utility with a dark background.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hover Effects Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Hover Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-lift p-4">
            <h3 className="font-semibold">Lift Effect</h3>
            <p>Hover to see the lift animation</p>
          </Card>
          <Card className="hover-scale p-4">
            <h3 className="font-semibold">Scale Effect</h3>
            <p>Hover to see the scale animation</p>
          </Card>
          <Card className="hover-rotate p-4">
            <h3 className="font-semibold">Rotate Effect</h3>
            <p>Hover to see the rotate animation</p>
          </Card>
        </div>
      </section>

      {/* Shadow Effects Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Shadow Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-soft p-4">
            <h3 className="font-semibold">Soft Shadow</h3>
            <p>Using shadow-soft utility</p>
          </Card>
          <Card className="shadow-hard p-4">
            <h3 className="font-semibold">Hard Shadow</h3>
            <p>Using shadow-hard utility</p>
          </Card>
        </div>
      </section>

      {/* Animations Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 animate-float">
            <h3 className="font-semibold">Float</h3>
            <p>Continuous floating animation</p>
          </Card>
          <Card className="p-4 animate-spin-slow">
            <h3 className="font-semibold">Slow Spin</h3>
            <p>Continuous rotation</p>
          </Card>
          <Card className="p-4 animate-pulse-slow">
            <h3 className="font-semibold">Slow Pulse</h3>
            <p>Continuous pulsing</p>
          </Card>
          <Card 
            className={`p-4 ${isActive ? 'animate-bounce-in' : 'animate-bounce-out'}`}
            onClick={() => setIsActive(!isActive)}
          >
            <h3 className="font-semibold">Bounce</h3>
            <p>Click to toggle bounce animation</p>
          </Card>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Interactive Elements</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button 
              className="hover-lift"
              onClick={() => document.querySelector('.shake-demo')?.classList.add('animate-shake')}
              onAnimationEnd={() => document.querySelector('.shake-demo')?.classList.remove('animate-shake')}
            >
              Trigger Shake
            </Button>
            <Button 
              className="hover-scale"
              onClick={() => document.querySelector('.zoom-demo')?.classList.add('animate-zoom-in')}
              onAnimationEnd={() => document.querySelector('.zoom-demo')?.classList.remove('animate-zoom-in')}
            >
              Trigger Zoom
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shake-demo p-4">
              <h3 className="font-semibold">Shake Demo</h3>
              <p>Click the button to trigger shake animation</p>
            </Card>
            <Card className="zoom-demo p-4">
              <h3 className="font-semibold">Zoom Demo</h3>
              <p>Click the button to trigger zoom animation</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Badge Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Badge Styles</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="hover-lift">Default</Badge>
          <Badge variant="secondary" className="hover-scale">Secondary</Badge>
          <Badge variant="destructive" className="hover-rotate">Destructive</Badge>
          <Badge variant="outline" className="border-gradient">Outline</Badge>
        </div>
      </section>

      {/* Dark Mode Specific Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gradient">Dark Mode Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="dark:glass-effect-dark p-4">
            <h3 className="font-semibold">Dark Mode Glass</h3>
            <p>This effect is only visible in dark mode</p>
          </Card>
          <Card className="dark:shadow-hard p-4">
            <h3 className="font-semibold">Dark Mode Shadow</h3>
            <p>Enhanced shadow effect in dark mode</p>
          </Card>
        </div>
      </section>
    </div>
  );
} 