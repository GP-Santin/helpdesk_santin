import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <SunIcon className="size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-90" />
      <MoonIcon className="absolute size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
