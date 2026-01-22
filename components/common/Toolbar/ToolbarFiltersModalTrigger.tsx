"use client";

import { DialogTrigger } from "react-aria-components";
import { ToolbarFiltersButtonMobile } from "./ToolbarFiltersButtonMobile";
import { ToolbarFiltersButtonDesktop } from "./ToolbarFiltersButtonDesktop";

interface ToolbarFiltersModalTriggerProps {
  children: React.ReactNode;
}

export function ToolbarFiltersModalTrigger({
  children,
}: ToolbarFiltersModalTriggerProps) {
  return (
    <DialogTrigger>
      <ToolbarFiltersButtonMobile />
      <ToolbarFiltersButtonDesktop />
      {children}
    </DialogTrigger>
  );
}
