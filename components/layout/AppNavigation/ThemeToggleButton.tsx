"use client";

import { Sun } from "lucide-react";
import { AppNavigationItem } from "./AppNavigationItem";

export function ThemeToggleButton() {
  return (
    <AppNavigationItem onPress={() => {}}>
      <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
      Light
    </AppNavigationItem>
  );
}
