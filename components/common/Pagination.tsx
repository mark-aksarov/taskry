"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/Skeleton";

const classes = "flex items-center justify-end gap-4 max-md:justify-between";

export const Pagination = () => {
  return (
    <div className={classes}>
      <Button
        variant="outlined"
        iconLeft={
          <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth />
        }
      />
      <span className="text-xs font-bold text-black dark:text-white">
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

export const PaginationSkeleton = () => {
  return (
    <div className={classes}>
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-6 w-[4rem]" />
      <Skeleton className="h-8 w-8" />
    </div>
  );
};
