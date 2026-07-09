import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";

export interface TaskGridProps {
  children: React.ReactNode;
}

export function TaskGrid({ children }: TaskGridProps) {
  const { viewMode } = useViewMode();

  return <EntityGrid viewMode={viewMode}>{children}</EntityGrid>;
}
