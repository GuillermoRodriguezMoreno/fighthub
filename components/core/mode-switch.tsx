"use client";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export function ModeSwitch() {
  const { setTheme, theme } = useTheme();
  const themeBooleanValue = theme === "light";
  const [themeValue, setThemeValue] =
    React.useState<boolean>(themeBooleanValue);
  const handleThemeChange = () => {
    setThemeValue(!themeValue);
    setTheme(themeValue ? "dark" : "light");
  };
  return (
    <div className="flex items-center space-x-2 p-2">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch checked={!themeValue} onCheckedChange={handleThemeChange} />
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
}
