"use client";

import { useContext } from "react";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-react";
import { Button, DisclosureStateContext, Heading } from "react-aria-components";

const button = tv({
  extend: focusRing,
  base: "flex w-full cursor-pointer items-center justify-between py-2 text-base font-semibold text-(--text-primary)",
});

export interface DisclosureHeaderProps {
  children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  let { isExpanded } = useContext(DisclosureStateContext)!;
  return (
    <Heading>
      <Button
        slot="trigger"
        className={(renderProps) => button({ ...renderProps })}
      >
        <span>{children}</span>
        <ChevronRight
          size={16}
          absoluteStrokeWidth
          strokeWidth={1.5}
          className={isExpanded ? "rotate-90 transform" : ""}
        />
      </Button>
    </Heading>
  );
}
