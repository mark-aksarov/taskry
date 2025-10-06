"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function ViewAllButton() {
  return (
    <Button
      variant="ghost"
      className="w-full justify-center rounded-none border-t-1 border-gray-300 py-5 dark:border-gray-600"
      label="View all"
      iconRight={<ArrowRight size={16} strokeWidth={1.5} absoluteStrokeWidth />}
    />
  );
}
