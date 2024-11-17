import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback } from 'react';

const ModeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <Button variant="ghost" className="group/toggle" size="icon" onClick={toggleTheme}>
      <SunIcon className="hidden [html.dark_&]:block size-4" />
      <MoonIcon className="hidden [html.light_&]:block size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeSwitcher;
