"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
  return (
    <div className="flex items-center justify-end gap-4 max-md:justify-between">
      <Button
        variant="outlined"
        iconLeft={
          <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <span className="text-xs font-semibold text-black dark:text-white">
        Page 1 of 10
      </span>
      <Button
        variant="outlined"
        iconRight={
          <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
    </div>
  );
};
