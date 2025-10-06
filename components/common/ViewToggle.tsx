import { ToggleButton, ToggleButtonGroup } from "@/components/ui";

export const ViewToggle = ({ className }: { className?: string }) => {
  return (
    <ToggleButtonGroup
      selectionMode="single"
      defaultSelectedKeys={["list"]}
      className={className}
      variant="contrast"
    >
      <ToggleButton id="list">List</ToggleButton>
      <ToggleButton id="grid">Grid</ToggleButton>
    </ToggleButtonGroup>
  );
};
