"use client";

import { Plus } from "lucide-react";
import { DisclosureHeader } from "@/ui/Disclosure";
import { twMerge } from "tailwind-merge";

export function AccordionHeader({ children }: { children: React.ReactNode }) {
  return (
    <DisclosureHeader
      className="gap-4 px-6 py-4 text-lg font-bold"
      renderIcon={(isExpanded) => (
        <span className="flex items-center justify-center rounded-lg bg-(--accent) p-1.5 text-white">
          <Plus
            size={22}
            absoluteStrokeWidth
            strokeWidth={1.5}
            className={twMerge(
              "transform transition-transform",
              isExpanded ? "rotate-45" : "",
            )}
            aria-hidden={false}
          />
        </span>
      )}
    >
      {children}
    </DisclosureHeader>
  );
}
