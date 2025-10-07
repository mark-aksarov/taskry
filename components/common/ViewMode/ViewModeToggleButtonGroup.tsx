"use client";

import { ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { useViewMode, ViewMode } from "./ViewModeContext";

export const ViewModeToggleButtonGroup = ({
  className,
}: {
  className?: string;
}) => {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <ToggleButtonGroup
      selectionMode="single"
      selectedKeys={[viewMode]}
      className={className}
      variant="contrast"
      disallowEmptySelection
      onSelectionChange={(keys) => {
        const [key] = Array.from(keys);
        setViewMode(key as ViewMode);
      }}
    >
      <ToggleButton id="list">List</ToggleButton>
      <ToggleButton id="grid">Grid</ToggleButton>
    </ToggleButtonGroup>
  );
};
