"use client";

import { useContext } from "react";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from "lucide-react";
import { Button, DisclosureStateContext, Heading } from "react-aria-components";

const button = tv({
  extend: focusRing,
  base: [
    "flex w-full items-center justify-between",
    "cursor-pointer",
    "py-2",
    "text-start text-base font-semibold",
    "text-(--text-primary)",
  ],
});

export interface DisclosureHeaderProps {
  children: React.ReactNode;
  className?: string;
  renderIcon?: (isExpanded: boolean) => React.ReactNode;
}

export function DisclosureHeader({
  children,
  className,
  renderIcon,
}: DisclosureHeaderProps) {
  let { isExpanded } = useContext(DisclosureStateContext)!;
  return (
    <Heading>
      <Button
        slot="trigger"
        className={(renderProps) => button({ ...renderProps, className })}
      >
        <span>{children}</span>
        {renderIcon ? (
          renderIcon(isExpanded)
        ) : (
          <ChevronRight
            
            
            
            className={twMerge(
              "transform transition-transform",
              isExpanded ? "rotate-90" : "",
            )}
          />
        )}
      </Button>
    </Heading>
  );
}
