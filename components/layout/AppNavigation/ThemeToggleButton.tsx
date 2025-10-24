"use client";

import { Sun } from "lucide-react";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ThemeToggleButton() {
  return (
    <NavigationButton onPress={() => {}}>
      <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
      Light
    </NavigationButton>
  );
}
